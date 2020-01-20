var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', require('connect-ensure-login').ensureLoggedIn(), function(req, res, next) {
  res.render('index');
})

router.get('/app', require('connect-ensure-login').ensureLoggedIn(), function(req, res, next) {
  res.render('index');
})


// Login Page
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    res.redirect('/');
  });

module.exports = router;
