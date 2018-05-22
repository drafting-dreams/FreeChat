const mongoose = require('mongoose');
const Message = new mongoose.Schema({
  sender: {type: String, required: true},
  receiver: {type: String, required: true},
  timestamp: {type: Number, required: true, default: Date.now},
  message: {type: String, required: true},
  status: {type: String, required: true, enum: ['sent', 'unsent']},
  translated: String
});


module.exports = mongoose.model('Message', Message);