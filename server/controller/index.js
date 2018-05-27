const express = require('express');
const authController = require('./authController');
const contactController = require("./contactController");


const router = express.Router();

authController(router, '/api/auth');
contactController(router, '/api/contact');


router.get('*', (req, res) => {
  res.redirect("/");
});

module.exports = router;
