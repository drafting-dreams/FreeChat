const User = require('../models/user');

describe("User", () => {
  describe("defaults", () => {
    let user = {};

    beforeAll(function () {
      user = new User();
    });

    test("user has created date", () => {
      expect(user.createAt).toBeDefined();
    });

    test("user has default status offline", () => {
      expect(user.status).toBeDefined();
    })
  });
});