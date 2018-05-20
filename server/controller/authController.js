const membershipService = require("../services/membershipService");

function main(router, prefix) {
  router.route(prefix + '/login')
    .post((req, res, next) => membershipService.login(req, res, next));


  router.route(prefix + '/logout')
    .get(function (req, res) {
      req.logout();
      res.redirect('/');
    });

  router.route(prefix + '/register')
    .post((req, res, next) => membershipService.register(req, res, next));

  router.route(prefix + '/me')
    .get((req, res) => {
      const user = req.user;
      if (user) {
        res.json({username: user.username, email: user.email});
      } else {
        res.json({});
      }
    });
}

module.exports = main;
