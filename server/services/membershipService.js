const passport = require('passport');
const membership = require('../membership');
const logger = require("../utils/getLogger");

module.exports = {
  login: function (req, res, next) {
    logger.debug('login req.body', req.body);

    function authenticateSuccess(user, info) {
      return user && info.success;
    }

    passport.authenticate('local', function (err, user, info) {
      logger.debug('authenticate user', info);
      if (err) logger.error(err);
      if (authenticateSuccess(user, info)) {
        req.logIn(user, function (err) {
          if (err) {
            return next(err);
          }
          return res.json({logged: info.success, message: info.message, username: user.username, email: user.email});
        });
      } else {
        res.json({logged: info.success, message: info.message});
      }
    })(req, res, next);
  },

  register: function (req, res) {
    membership.register(
      {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        confirm: req.body.confirm
      },
      function (err, result) {
        logger.error(err, result);
        res.json(result);
      }
    );
  }
};