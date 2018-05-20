const express = require('express');
const path = require('path');
const authController = require('./authController');
const contactController = require("./contactController");


const router = express.Router();

authController(router, '/api/auth');
contactController(router, '/api/contact');


router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
  // res.redirect("/");
});

module.exports = router;
