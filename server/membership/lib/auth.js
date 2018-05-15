const User = require('../models/user');
const Emitter = require('events').EventEmitter;
const util = require('util');

const createAuthResult = function () {
  return {
    success: false,
    user: null,
    message: null,
  };
};

const Auth = function () {
  const self = this;
  Emitter.call(self);
  let continueWith = null;
  self.authenticate = function (args, next) {
    continueWith = next;
    let authRes = createAuthResult();
    if (!args.email || !args.password) {
      authRes.message = 'email and password needed';
      self.emit('invalid attempt');
    } else {
      self.emit('valid attempt', args);
    }
  };

  function checkUserInfo(args) {
    User.findOne(
        {email: args.email, password: args.password},
        function (err, user) {
          if (err) throw err;

          let authRes = createAuthResult();
          if (user) {
            authRes.user = user;
            authRes.success = true;
            user.status = 'online';
            user.save(function (err, res) {
              if (err) throw err;
              self.emit('success', authRes);
            });
          } else {
            authRes.success = false;
            authRes.message = 'log fail';
            self.emit('fail', authRes);
          }

          if (continueWith) {
            continueWith(null, authRes);
          }
        });
  }

  function loginFail(args) {
    let authRes = createAuthResult();
    authRes.success = false;
    authRes.message = args.message;
    self.emit('fail', authRes);
    if (continueWith) {
      continueWith(null, authRes);
    }
  }



  self.on('valid attempt', checkUserInfo);

  self.on('invalid attempt', loginFail);
};
util.inherits(Auth, Emitter);

module.exports = Auth;