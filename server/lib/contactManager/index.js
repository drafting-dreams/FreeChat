const manager = require("./lib/manager");

function buildConnection(emailA, emailB) {
  return manager.buildConnection(emailA, emailB)
}

function getContacts(email) {
  return manager.getContacts(email);
}

module.exports = {buildConnection, getContacts};