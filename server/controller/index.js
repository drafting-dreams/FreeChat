const express = require('express');
const path = require('path');
const authController = require('./authController');


const router = express.Router();

authController(router, '/api/auth');

router.get('*', (req, res) => {
  // res.sendFile(path.join(__dirname, '../../dist/index.html'));
  res.redirect("/");
});

module.exports = router;
