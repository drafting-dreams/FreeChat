const User = require('../models/user');
const Emitter = require('events').EventEmitter;
const util = require('util');
const Application = require('../models/Application');

const createRegResult = function () {
  return {
    success: false,
    message: null,
    user: null
  };
};

const Registration = function () {
  const self = this;
  let continueWith = null;

  self.Register = function (args, next) {
    continueWith = next;
    const appli = new Application(args);
    self.emit('application-received', appli);
  };

  const validateApplication = function (app) {
    if (!app.email || !app.password) {
      app.setInvalid("Email and password are required");
      self.emit("invalid", app);
    } else if (!app.username) {
      app.setInvalid("username missing");
      self.emit("invalid", app);
    }
    else if (app.password !== app.confirm) {
      app.setInvalid("password and confirm not match");
      self.emit("invalid", app);
    } else {
      app.validate();
      self.emit("validated", app);
    }
    //todo email and password don't match

  };

  const checkIfUserExists = function (app) {
    User.findOne({email: app.email}, function (err, result) {
      if (err) throw err;
      if (result) {
        app.setInvalid("This email is used");
        self.emit('invalid', app);
      } else {
        self.emit('user-doesnt-exists', app);
      }
    });
  };

  const createUser = function (app) {
    const newUser = new User();
    newUser.email = app.email;
    newUser.password = app.password;
    newUser.username = app.username;
    newUser.save(function (err, user) {
      if (err) throw err;
      app.user = user;
      self.emit('user-created', app);
    });
  };

  const registrationOk = function (app) {
    const regResult = createRegResult();
    regResult.user = app.user;
    regResult.success = true;
    regResult.message = "Welcome!";
    self.emit('registered', regResult);
    if (continueWith) {
      continueWith(null, regResult);
    }
  };

  const registrationFail = function (app) {
    const regResult = createRegResult();
    regResult.success = false;
    regResult.message = app.message;
    self.emit('not-registered', regResult);

    //todo this code here is not so good
    if (continueWith) {
      continueWith(null, regResult);
    }
  };

  self.on('application-received', validateApplication);
  self.on('validated', checkIfUserExists);
  self.on('user-doesnt-exists', createUser);
  self.on('user-created', registrationOk);

  self.on('invalid', registrationFail);
};
util.inherits(Registration, Emitter);

module.exports = Registration;