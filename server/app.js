require('dotenv').load();
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport'),
  LocalStrategy = require('passport-local'),
  memberShip = require('./membership/index');
const logger = require("./utils/getLogger");
const express = require("express");
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_STR).then(() => {
  logger.info("connect to db: " + process.env.DB_STR);
});

const app = express();

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function (email, password, done) {
    memberShip.authenticate(email, password, function (err, authRes) {
      if (err) return done(err);
      if (authRes.success) {
        return done(null, authRes.user, authRes);
      } else {
        return done(null, null, authRes);
      }
    });
  }
));
passport.serializeUser(function (user, done) {
  logger.info('serialize called');
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  logger.info('deserialize called');
  // memberShip.findUserById(id, function (err, user) {
  done(null, user);
  // });
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(
  session(
    {
      secret: "forever321",
      resave: false,
      saveUninitialized: true,
      cookie: {
        // maxAge: 1000 * 60 * 60
      }
    }
  )
);
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  logger.info(req.url);
  res.locals.user = req.user;
  next();
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.sender('error');
});