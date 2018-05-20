const Registration = require('../lib/registration');
const User = require('../models/user');
const librarian = require('../lib/librarian');
describe("librarian tests", () => {
  const registration = new Registration();
  const testUser = {
    username: 'hi',
    email: "123@me.com",
    password: "freedom",
    confirm: "freedom"
  };

  beforeAll(function (done) {
    require('../../utils/connectTestDB')(
      function (err, db) {
        if (err) throw err;
        User.collection.drop(
          function (err) {
            if (err && err.message !== 'ns not found') throw err;

            registration.Register(
              testUser,
              function (err) {
                if (err) throw err;
                done();
              });
          });
      });
  });

  describe('find user by email', () => {
    let optResult = {};
    beforeAll(done => {
      librarian.findUserByEmail(testUser.email, res => {
        optResult = res;
        done();
      });
    });

    it("should found the user", () => expect(optResult.success).toBe(true));
    it("should found correct user", () => {
      expect(optResult.user.id).toBeDefined();
      expect(optResult.user.username).toBeDefined();
      expect(optResult.user.email).toBeDefined();
      expect(optResult.user.email).toBe(testUser.email);
    });
  });

  describe('find nonexisted user', () => {
    let optResult = {};
    beforeAll(done => {
      librarian.findUserByEmail('nothing', res => {
        optResult = res;
        done();
      });
    });

    it("should be unsuccessful", () => expect(optResult.success).toBe(false));

  });
});
