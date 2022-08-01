const bouncer = require('express-bouncer');

bouncer.blocked = async (req, res, next, remaining) => {
  try {
    await res.json({
      message: `Too many requests, please try again in ${remaining} seconds.`,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = bouncer;
