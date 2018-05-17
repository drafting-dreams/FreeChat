const Registration = require('../lib/registration');
const db = require('mongoose');
const Auth = require('../lib/auth');
const User = require('../models/user');


describe('Authentication', () => {
  const registration = new Registration();
  const auth = new Auth();
  const testUser = {
    username: 'hi',
    email: "123@me.com",
    password: "freedom",
    confirm: "freedom"
  };

  function authenticateUserGetResult(user, done) {
    auth.authenticate(user, function (err, res) {
      if (err) throw err;
      done(res);
    });
  }

  beforeAll(function (done) {
    require('../../utils/connectTestDB')(
      function (err, db) {
        if (err) throw err;
        User.collection.drop(
          function (err, result) {
            if (err && err.message !== 'ns not found') throw err;
            registration.Register(
              testUser,
              function (err, result) {
                if (err) throw err;
                done();
              });
          });
      });
  });

  describe('a valid sign in', () => {
    let authResult = {};
    beforeAll(function (done) {
      authenticateUserGetResult(
        {email: '123@me.com', password: 'freedom'},
        function (res) {
          authResult = res;
          done();
        }
      );
    });

    test('is successful', () => expect(authResult.success).toBe(true));
    test('return a user', () => expect(authResult.user).toBeDefined());
    test(
      'updates the user stats',
      () => expect(authResult.user.status).toBe('online')
    );
    test(
      'user should have username',
      () => expect(authResult.user.username).toBeDefined()
    );
  });

  afterAll(function (done) {
    db.disconnect(function (err) {
      if (err) throw err;
      done();
    });
  });
});
