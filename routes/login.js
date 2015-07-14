var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET login listing. */
router.get('/', function(req, res, next) {
  if (req.user){
    res.redirect('/')
  }
  vm = {
    title:'Login',
    error: req.flash('error')
  }
  res.render('login', vm);
});

/* POST to login admin. */
router.post('/', passport.authenticate('local',
{
  failureRedirect:'/login',
  successRedirect:'/',
  failureFlash: 'Invalid credentials'
}));

module.exports = router;
