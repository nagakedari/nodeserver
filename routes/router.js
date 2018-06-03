var express = require('express');
var router = express.Router();
var User = require('../model/user')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/users', function (req, res, next) {
  if (req.body.username && req.body.password && req.body.role) {
    var userData = {
      username: req.body.username,
      password: req.body.password,
      role: req.body.role
    };

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        // console.log('user created successfully');
        // req.session.userId = user._id;
        // return res.redirect('/profile');
      }
    });
  } 
});

router.post('/login', function(req, res, next){
  if (req.body.username && req.body.password) {
    User.authenticate(req.body.username, req.body.password, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong username or password.');
        err.status = 401;
        return next(err);
      } else {
        console.log('User Logged in successfully');
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  }
});

module.exports = router;
