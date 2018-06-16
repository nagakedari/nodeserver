var db = require('mongodb');
var bcrypt = require('bcrypt');

var User = function (app) {
  this.dbc = app.get('mongo');
  var db = this.dbc.db('local');
  this.collection = db.collection('users');
};

User.prototype.add = function (user, callback) {
  var collection = this.collection;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      callback(err, user);
    }
    user.password = hash;
    collection.insert(user, function (err, result) {
      callback(err, result);
    });
  });
};

User.prototype.find = function(data, callback) {
  this.collection.find().sort({username: 1}).toArray(function(err, users){
    callback(err, users);
  });
};

User.prototype.findOne = function(data, callback) {
  this.collection.findOne(data, function(err, user){
    callback(err, user);
  });
}

module.exports = User;