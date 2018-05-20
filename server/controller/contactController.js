const contactsManager = require("../lib/contactManager");
const membership = require("../lib/membership");

function main(router, prefix) {
  router.route(prefix + '/addContact/:email')
    .get(function (req, res) {
      const another = req.params.email;
      const me = req.user.email;
      console.log(me, another);
      contactsManager.buildConnection(me, another)
        .then(result => res.json(result));
    });


  router.get(prefix + '/getContacts', function (req, res) {
    const me = req.user.email;
    console.log(me);

    contactsManager.getContacts(me)
      .then(results => res.json(results));
  });

  router.get(prefix + '/find/:email', function (req, res) {
    const email = req.params.email;
    membership.findUserByEmail(email, function (result) {
      if (result.success) {
        result.user = {name: result.user.username, email: result.user.email};
      }
      res.json(result);
    });
  })
}

module.exports = main;
