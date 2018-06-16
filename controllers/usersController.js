var express = require('express');
var router = express.Router();
var Users = require('../daos/userDao');

var UserController = function() {
}

UserController.prototype.add = function(req, res) {
  var users = new Users(req.app);
  if(!req.body.username || !req.body.password){
    res.json({success: false, msg: 'Username and Password is required'});
  } else {
    var query = {username: req.body.username};
    users.findOne(query, function(err, user){
      if(user){
        res.json({success: false, msg: 'Username already exists, try a different one'});
      } else if (err){
        res.status(500).send(err);
      } else {
        var userData = {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          username: req.body.username,
          password: req.body.password,
          role: req.body.role,
          metadata: {createdby: req.body.username, createdat: new Date()}
        };
        users.add(userData, function(err, user){
          if(err){
            res.status(500).send(err);
          } else{
            res.json(user);
          }
        });
      }
    });
  }
}
  module.exports = new UserController;

  