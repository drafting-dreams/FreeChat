const Registration = require('../lib/registration');
const Verifier = require('../models/Application');
const db = require('mongoose');
let User = require('../models/user');

describe("registration", () => {
  const registration = new Registration();

  const createUserGetResult = function (user, done) {
    User.collection.drop(function (err, result) {
      if (err && err.message !== 'ns not found') throw err;
      console.log('db cleared');
      registration.Register(user,
          function (err, result) {
            done(result);
          });
    });
  };

  beforeAll(function (done) {
    require('./connectTestDB')(done);
  });


  describe("a valid application", () => {
    let regResult = {};
    beforeAll(function (done) {
      createUserGetResult(
          {
            username: 'hi',
            email: "123@me.com",
            password: "freedom",
            confirm: "freedom"
          },
          function (res) {
            regResult = res;
            done();
          });
    });

    test("is successful", () => expect(regResult.success).toBe(true));
    test("create a user", () => expect(regResult.user).toBeDefined());
  });

  describe("an empty or null email", () => {
    let regResult = {};
    beforeAll(function (done) {
      createUserGetResult(
          {
            username: 'ha',
            email: null,
            password: "freedom",
            confirm: "freedom"
          },
          function (res) {
            regResult = res;
            done();
          }
      );
    });

    test("is not successful", () => expect(regResult.success).toBe(false));
    test(
      "tells user that email is required",
      () => expect(regResult.message).toBe("Email and password are required")
    );
  });

  describe("password and confirm not match", () => {
    let regResult = null;
    beforeAll(function (done) {
      createUserGetResult(
          {
            username: 'ha',
            email: '123@me.com',
            password: "freedom",
            confirm: "freedom1"
          },
          function (res) {
            regResult = res;
            done();
          }
      );
    });

    test("is not successful", () => expect(regResult.success).toBe(false));
    test(
      "message is : password and confirm not match",
      () => expect(regResult.message).toBe("password and confirm not match")
    );
  });

  describe("user already exist", () => {
    let regResult = null;
    beforeAll(function (done) {
      const user = {
        username: 'ha',
        email: '123@me.com',
        password: "freedom",
        confirm: "freedom"
      };

      User.collection.drop(function (err) {
        if (err && err.message !== 'ns not found') throw err;
        console.log('db cleared');
        registerTwice();
      });

      function registerTwice() {
        registration.Register(user,
            function (err, result) {
              if (err) throw err;
              registration.Register(user,
                  function (err, result) {
                    if (err) throw err;
                    regResult = result;
                    done();
                  });
            });
      }
    });

    test("is not successful", () => expect(regResult.success).toBe(false));
    test(
      "message is: This email is used",
      () => expect(regResult.message).toBe("This email is used")
    );
    test("user should be null", () => expect(regResult.user === null).toBeTruthy());
  });

  describe("user name missing", () => {
    let regResult = null;
    beforeAll(function (done) {
      const user = {
        email: '123@me.com',
        password: "freedom",
        confirm: "freedom"
      };

      User.collection.drop(function (err) {
        if (err && err.message !== 'ns not found') throw err;
        createUserGetResult(
            user,
            function (res) {
              regResult = res;
              done();
            }
        );
      });
    });

    test("is not successful", () => expect(regResult.success).toBe(false));
    test(
      "message is : username missing",
      () => expect(regResult.message).toBe("username missing")
    );
  });


  afterAll(function (done) {
    db.disconnect(function (err) {
      if (err) throw err;
      done();
    });
  });
});