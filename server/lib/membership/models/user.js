const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  createAt: {type: Date, required: true, default: Date.now},
  status: {type: String, required: true, default: 'offline'}
});

const exportModel = mongoose.model('User', userSchema);

module.exports = exportModel;
