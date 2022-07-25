/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const Joi = require('joi');
const CryptoJS = require('crypto-js');
const Jwt = require('jsonwebtoken');
const User = require('../models/Users');

// Register
router.post('/register', async (req, res) => {
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
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (req.body.email.length < 1 || req.body.password.length < 1) {
      res.status(400).json({
        status: 'failed to login',
        message: 'Email or password is required',
      });
    }
    if (!user) {
      res.status(400).json({
        status: 'failed to login',
        message: 'User does not exist',
      });
    }
    const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const passwordUser = decryptedPassword.toString(CryptoJS.enc.Utf8);

    if (passwordUser !== req.body.password) {
      res.status(400).json({
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
      data: { ...info, accessToken },
    });
  } catch (err) {
    return res.status(400).send(err);
  }
});

module.exports = router;
