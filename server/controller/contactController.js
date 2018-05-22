const contactsManager = require("../lib/contactManager");
const membership = require("../lib/membership");
const utils = require("util");

function main(router, prefix) {
  router.route(prefix + '/addContact/:email')
    .get(function (req, res) {
      const another = req.params.email;
      const me = req.user.email;
      contactsManager.buildConnection(me, another)
        .then(result => res.json(result));
    });


  router.get(prefix + '/getContacts', function (req, res) {
    const me = req.user.email;
    contactsManager.getContacts(me)
      .then(emails => {
        const findUser = membership.findUserByEmail;
        findUser[utils.promisify.custom] = (a) => {
          return new Promise((resolve) => {
            findUser(a, resolve);
          });
        };
        const promisified = utils.promisify(findUser);

        return Promise.all(
          emails.map(email => {
            return promisified(email);
          })
        )
      })
      .then(objs => {
        res.json({contacts: objs.map(obj => ({email: obj.user.email, name: obj.user.username}))});
      });
  });

  router.get(prefix + '/find/:email', function (req, res) {
    const me = req.user.email;
    const email = req.params.email;
    if (me === email) {
      return res.json({success: false});
    }

    membership.findUserByEmail(email, function (result) {
      if (result.success) {
        result.user = {name: result.user.username, email: result.user.email};
      }
      res.json(result);
    });
  })
}

module.exports = main;
