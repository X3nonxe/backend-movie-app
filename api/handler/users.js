/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const CryptoJS = require('crypto-js');
const User = require('../models/Users');
const verifyUser = require('../src/verifyToken');

// Update user by id
router.put('/:id', verifyUser, async (req, res) => {
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
});

// Delete
router.delete('/:id', verifyUser, async (req, res) => {
  if (req.user.id === req.params.id || req.user.is_admin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({
        status: 'success',
        message: 'Successfully to delete account',
      });
    } catch (err) {
      res.status(400).json({
        status: 'failed',
        message: err.message,
      });
    }
  }
  return res.status(403).json({
    status: 'faild',
    message: 'You can only delete your own account',
  });
});

// Get user by id
router.get('/find/:id', verifyUser, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json({
      status: 'success',
      message: 'Successfully get user',
      data: info,
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message,
    });
  }
});

// Get all user
// eslint-disable-next-line consistent-return
router.get('/', verifyUser, async (req, res) => {
  const query = req.query.new;
  if (req.user.is_admin) {
    try {
      const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find();
      res.status(200).json({
        status: 'success',
        message: 'Successfully to get all account',
        data: users,
      });
    } catch (err) {
      res.status(400).json({
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
});

// Users Stats
router.get('/stats', async (req, res) => {
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
    res.status(200).json({
      status: 'success',
      message: 'Successfully to get all account',
      data: usersStats,
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
});

module.exports = router;
