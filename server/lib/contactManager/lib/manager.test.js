const manager = require("./manager");
const ContactList = require("../models/ContactList");

const userEmails = ['1@me.com', '2@me.com', '3@me.com', '4@me.com'];

beforeAll(done => {
  require("../utils/connectTestDB")(done);
});

describe("crud operation on contactList", function () {
  beforeEach(() => ContactList.collection.drop());

  test("build contact", function () {
    return manager
      .buildConnection(userEmails[0], userEmails[1])
      .then(res => {
        expect(res.success).toEqual(true);
      });
  });


  test("find contacts", function () {
    return manager.buildConnection(userEmails[0], userEmails[1])
      .then(() => manager.buildConnection(userEmails[0], userEmails[2]))
      .then(() => manager.buildConnection(userEmails[1], userEmails[3]))
      .then(() => manager.getContacts(userEmails[0]))
      .then(res => {
        expect(res.length).toBe(2);
        expect(res).toContain(userEmails[1]);
        expect(res).toContain(userEmails[2]);
      })
      .then(() => manager.getContacts(userEmails[1]))
      .then(res => {
        expect(res.length).toBe(2);
        expect(res).toContain(userEmails[0]);
        expect(res).toContain(userEmails[3]);
      });
  });
});
