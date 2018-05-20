const User = require('../models/user');
module.exports = {
  findUserByEmail: function (email, cb) {
    User.findOne({email: email})
      .then((res) => {
        if (res == null) {
          cb({success: false});
          return;
        }

        cb({success: true, user: res});
      });
  }
};