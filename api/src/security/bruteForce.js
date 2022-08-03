const limitter = require('express-rate-limit');

const bruteForce = limitter({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again in 15 minutes',
});

module.exports = bruteForce;
