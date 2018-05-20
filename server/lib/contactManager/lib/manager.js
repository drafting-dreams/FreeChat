const ContactList = require("../models/ContactList");
const logger = require("../utils/getLogger");

function buildConnection(emailA, emailB) {
  return _getOrCreateContactList(emailA)
    .then(res => {
      const listA = res;
      listA.friendEmails.push(emailB);
      listA.friendEmails = Array.from(new Set(listA.friendEmails));
      return listA.save();
    })
    .then(() => {
      return _getOrCreateContactList(emailB)
    })
    .then(res => {
      const listB = res;
      listB.friendEmails.push(emailA);
      listB.friendEmails = Array.from(new Set(listB.friendEmails));
      return listB.save();
    })
    .then(() => {
      return {success: true};
    })
    .catch(err => {
      logger.error("build connection error ", err);
      return {success: false};
    })
}

function getContacts(email) {
  return _getOrCreateContactList(email)
    .then(res => {
      return res.friendEmails;
    });
}


function _getOrCreateContactList(email) {
  return ContactList.findOne({userEmail: email})
    .then(res => {
      if (!res) {
        const contactList = new ContactList({userEmail: email});
        return contactList.save();
      }
      return res;
    })
    .catch(err => {
      logger.error(err)
    });
}


module.exports = {buildConnection, getContacts};