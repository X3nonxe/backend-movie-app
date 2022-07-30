const bouncer = require('express-bouncer');

bouncer.whitelist.push('127.0.0.1');
bouncer.blocked = (req, res, next, remaining) => res.status(429).json({
  status: 'error',
  message: `too many requests, please try again later${remaining / 1000} seconds`,
});

module.exports = bouncer.blocked;
