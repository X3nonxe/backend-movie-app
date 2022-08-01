/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const Joi = require('joi');
const CryptoJS = require('crypto-js');
const Jwt = require('jsonwebtoken');
const User = require('../models/Users');
const bruteForce = require('../security/bruteForce');
const csrfProtection = require('../security/csrf');

// Register
router.post('/register', csrfProtection, async (req, res) => {
  // validate user input
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string()
      .min(8)
      .max(30)
      .pattern(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
  });
  if (req.body.email.length < 1) {
    return res.status(400).json({
      status: 'failed to register',
      message: 'Email is required',
    });
  }
  if (req.body.password.length < 1) {
    return res.status(400).json({
      status: 'failed to register',
      message: 'Password is required',
    });
  }
  if (req.body.username.length < 1) {
    return res.status(400).json({
      status: 'failed to register',
      message: 'Username is required',
    });
  }
  if (req.body.username.length < 1 && req.body.password.length < 1 && req.body.email.length < 1) {
    return res.status(400).json({
      status: 'failed to register',
      message: 'Username, Password and Email are required',
    });
  }
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 'failed to register',
      message: error.details[0].message,
    });
  }
  // check if user already exists
  const userExist = await User.findOne({ email: req.body.email });
  if (userExist) {
    return res.status(400).json({
      status: 'failed to register',
      message: 'User already exists',
    });
  }
  const newUser = new User({
    username: req.body.username,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
    email: req.body.email,
  });
  try {
    const user = await newUser.save();
    return res.status(201).json({
      status: 'success',
      message: 'Successfully registered',
      data: user,
      csrfToken: req.csrfToken(),
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

// Login
router.post('/login', bruteForce, csrfProtection, async (req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
      password: Joi.string()
        .min(8)
        .max(16)
        .pattern(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
    });
    if (req.body.email.length < 1) {
      return res.status(400).json({
        status: 'failed to register',
        message: 'Email is required',
      });
    }
    if (req.body.password.length < 1) {
      return res.status(400).json({
        status: 'failed to register',
        message: 'Password is required',
      });
    }
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'failed to register',
        message: error.details[0].message,
      });
    }
    const user = await User.findOne({ email: req.body.email });
    if (req.body.email.length < 1 || req.body.password.length < 1) {
      return res.status(400).json({
        status: 'failed to login',
        message: 'Email or password is required',
      });
    }
    // invalid email and password
    if (req.body.email.length < 1 && req.body.password.length < 1) {
      return res.status(400).json({
        status: 'failed to register',
        message: 'Email and Password are required',
      });
    }
    if (!user) {
      return res.status(400).json({
        status: 'failed to login',
        message: 'User does not exist',
      });
    }
    const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const passwordUser = decryptedPassword.toString(CryptoJS.enc.Utf8);

    if (passwordUser !== req.body.password) {
      return res.status(400).json({
        status: 'failed to login',
        message: 'Password is incorrect',
      });
    }
    // jwt
    const accessToken = Jwt.sign({ id: user._id, is_admin: user.is_admin }, process.env.SECRET_KEY, { expiresIn: '5h' });
    // update last login
    await User.findByIdAndUpdate(user._id, {
      $set: {
        last_login: new Date(),
      },
    });
    const { password, ...info } = user._doc;
    return res.status(200).json({
      status: 'success',
      message: 'Successfully logged in',
      data: { ...info, accessToken, csrfToken: req.csrfToken() },
    });
  } catch (err) {
    return res.status(400).send(err);
  }
});

module.exports = router;
