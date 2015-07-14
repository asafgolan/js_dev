var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET login listing. */
router.get('/', function(req, res, next) {
  console.log('HERE');
  req.logout();
  res.redirect('/login');
});

module.exports = router;
