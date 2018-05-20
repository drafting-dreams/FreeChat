const mongoose = require('mongoose');

const ContactList = new mongoose.Schema({
  userEmail: {type: String, required: true},
  friendEmails: [String]
});

module.exports = mongoose.model('ContactList', ContactList);