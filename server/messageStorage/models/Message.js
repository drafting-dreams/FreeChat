const mongoose = require('mongoose');
const Message = new mongoose.Schema({
  from: {type: mongoose.Schema.Types.ObjectId, required: true},
  to: {type: mongoose.Schema.Types.ObjectId, required: true},
  timestamp: {type: Number, required: true, default: Date.now},
  message: {type: String, required: true},
  status: {type: String, required: true, enum: ['sent', 'unsent']}
});


module.exports = mongoose.model('Message', Message);
