const lib = require("./messageManager");
const mongoose = require("mongoose");
const Message = require("../models/Message");

beforeAll(done => {
  require("../../utils/connectTestDB")(done);
});

afterAll(done => {
  mongoose.disconnect(done);
});

const userA = mongoose.Types.ObjectId();
const userB = mongoose.Types.ObjectId();
const userC = mongoose.Types.ObjectId();

describe("saveMessage", function () {
  test("saveMessage success", function () {
    const message = Date.now().toString();

    return lib
      .saveMessage({
        from: userA,
        to: userB,
        message,
        status: 'sent'
      })
      .then(res => {
        expect(res).toBeDefined();
        expect(res.success).toBe(true);
        expect(res.result.message).toEqual(message);
      });
  });
});

describe("getMessage", function () {

  beforeAll(() => {
    return Message.collection.drop()
      .then(() => Promise.all(
        [
          lib.saveMessage({
            from: userA,
            to: userB,
            message: "dummy",
            status: 'sent'
          }),
          lib.saveMessage({
            from: userA,
            to: userB,
            message: "unsent",
            status: 'unsent'
          }),
          lib.saveMessage({
            from: userB,
            to: userA,
            message: "dummy",
            status: 'sent'
          })
        ]
      ))
  });


  test("get all message success", function () {
    return lib.getMessage({from: userA, to: userB})
      .then(res => {
        expect(res.length).toBe(2);
      });
  });


  test("get unsent message success", function () {
    return lib.getMessage({from: userA, to: userB, status: 'unsent'})
      .then(res => {
        expect(res.length).toBe(1);
        expect(res[0].message).toEqual("unsent");
      });
  })

});

describe("updateAllUnsentMessage", function () {
  beforeAll(() => {
    return Message.collection.drop()
      .then(() => Promise.all(
        [
          lib.saveMessage({
            from: userA,
            to: userB,
            message: "dummy",
            status: 'sent'
          }),
          lib.saveMessage({
            from: userA,
            to: userB,
            message: "unsent",
            status: 'unsent'
          }),
          lib.saveMessage({
            from: userB,
            to: userA,
            message: "dummy",
            status: 'sent'
          })
        ]
      ))
  });

  return lib.updateAllUnsentMessage({from: userA, to: userB})
    .then(() => lib.getMessage({from: userA, to: userB, status: 'unsent'}))
    .then(res => {
      expect(res.length).toBe(0);
    })
});
