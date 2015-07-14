var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  vm ={
    title: 'admin gui',
    username: req.user? req.user.username :null
  }
  res.render('index', vm);
});

module.exports = router;
