const User = require('../models/user');
const api = require('../index');
const db = require('mongoose');


describe('api tests', () => {
  beforeAll(function connectDB(done) {
    require("../../utils/connectTestDB")(done);
  });
  const testUser = {
    username: 'hi',
    email: "123@me.com",
    password: "freedom",
    confirm: "freedom"
  };

  describe('registration', () => {
    let regResult = {};

    beforeAll(function (done) {
      User.collection.drop(
        function (err, res) {
          if (err && err.message !== 'ns not found') throw err;
          api.register(
            testUser,
            function (err, result) {
              if (err) throw err;
              regResult = result;
              done();
            });
        });
    });

    test('register success', () => expect(regResult.success).toBe(true));
    test('has a user', () => expect(regResult.user).toBeDefined());
    test('user is right', () => {
      expect(regResult.user.username).toBe(testUser.username);
      expect(regResult.user.email).toBe(testUser.email);
      expect(regResult.user.password).toBe(testUser.password);
    });
  });

  describe('authentication', () => {
    let authResult = {};
    beforeAll(function (done) {
      api.authenticate(testUser.email, testUser.password, function (err, res) {
        authResult = res;
        done();
      });
    });

    test('log in success', () => expect(authResult.success).toBe(true));
    test('has a user', () => expect(authResult.user).toBeDefined());
  });

  describe("find user by email", () => {
    let optResult = {};
    beforeAll(done => {
      api.findUserByEmail(testUser.email, res => {
        optResult = res;
        done();
      });
    });

    it("should found the user", () => {
      expect(optResult.success).toBe(true);
      expect(optResult.user.email === testUser.email);
    });

  });
  afterAll(function disconnectDB(done) {
    db.disconnect(function (err) {
      if (err) throw err;
      done();
    });
  });
});