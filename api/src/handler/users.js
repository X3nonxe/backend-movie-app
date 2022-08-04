/* eslint-disable no-underscore-dangle */
const CryptoJS = require('crypto-js');
const Joi = require('joi');
const User = require('../models/Users');

// Update user by id
const updateUserById = async (req, res) => {
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
  const isInputNotFound = req.body.email.length < 1 && req.body.password.length < 1;
  if (req.body.username.length < 1 && isInputNotFound) {
    return res.status(400).json({
      status: 'failed to update',
      message: 'Username, email, and password are required',
    });
  }
  if (isInputNotFound) {
    return res.status(400).json({
      status: 'failed to update',
      message: 'Email and password is required',
    });
  }
  if (req.body.email.length < 1) {
    return res.status(400).json({
      status: 'failed to update',
      message: 'Email is required',
    });
  }
  if (req.body.password.length < 1) {
    return res.status(400).json({
      status: 'failed to update',
      message: 'Password is required',
    });
  }
  if (req.body.username.length < 1) {
    return res.status(400).json({
      status: 'failed to update',
      message: 'Username is required',
    });
  }
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 'failed update user',
      message: error.details[0].message,
    });
  }
  if (req.user.id === req.params.id || req.user.is_admin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY,
      ).toString();
    }
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        },
      );
      return res.status(200).json({
        status: 'success',
        message: 'User updated',
        data: updateUser,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'failed',
        message: err.message,
      });
    }
  } else {
    return res.status(403).json({
      status: 'failed',
      message: 'You can only update your own account',
    });
  }
};

// Delete
const deleteUser = async (req, res) => {
  if (req.user.id === req.params.id || req.user.is_admin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        status: 'success',
        message: 'Successfully to delete account',
      });
    } catch (err) {
      return res.status(400).json({
        status: 'failed',
        message: err.message,
      });
    }
  }
  return res.status(403).json({
    status: 'faild',
    message: 'You can only delete your own account',
  });
};

// Get user by id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    return res.status(200).json({
      status: 'success',
      message: 'Successfully get user',
      data: info,
    });
  } catch (err) {
    return res.status(400).json({
      status: 'failed',
      message: err.message,
    });
  }
};

// Get all user
// eslint-disable-next-line consistent-return
const getAllUser = async (req, res) => {
  const query = req.query.new;
  if (req.user.is_admin) {
    try {
      const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find();
      return res.status(200).json({
        status: 'success',
        message: 'Successfully to get all account',
        data: users,
      });
    } catch (err) {
      return res.status(400).json({
        status: 'failed',
        message: err.message,
      });
    }
  } else {
    return res.status(403).json({
      status: 'failed',
      message: 'You are not allowed to see all users',
    });
  }
};

// Users Stats
const userStats = async (req, res) => {
  const today = new Date();
  const year = today.setFullYear(today.setFullYear() - 1);
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  try {
    const users = await User.find();
    const usersStats = {
      totalUsers: users.length,
      activeUsers: users.filter((u) => u.last_login > year).length,
      inactiveUsers: users.filter((u) => u.last_login < year).length,
      // eslint-disable-next-line no-shadow
      usersByMonth: month.map((month) => {
        // eslint-disable-next-line max-len
        const usersByMonth = users.filter((u) => new Date(u.last_login).getMonth() === month).length;
        return {
          month,
          usersByMonth,
        };
      }),
    };
    return res.status(200).json({
      status: 'success',
      message: 'Successfully to get all account',
      data: usersStats,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
};

module.exports = {
  updateUserById, deleteUser, getUserById, getAllUser, userStats,
};
