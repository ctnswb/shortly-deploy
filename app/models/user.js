var mongoose = require('../config');
var bcrypt = require('bcrypt-nodejs');

var User = mongoose.model('User', mongoose.userSchema);


User.prototype.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
    callback(isMatch);
  });
};

module.exports = User;
