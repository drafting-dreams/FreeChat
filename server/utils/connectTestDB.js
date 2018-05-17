const db = require('mongoose');

module.exports = function (done) {
  db.Promise = global.Promise;
  db.connect('mongodb://127.0.0.1:27017/freeChatTest',
      function (err, db) {
        if (err) {
          console.log(err);
          done(err);
        }
        console.log('connect to database freeChatTest');
        done();
      });
};
