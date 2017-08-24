var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/shortly');
var Promise = require('bluebird');

var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

mongoose.userSchema = new Schema({
  username : { type: String, index: { unique: true}},
  password : String,
  timestamps : { type: Date, default: Date.now}
});

mongoose.userSchema.pre('save', function(next) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.get('password'), null, null).bind(this).then(function(hash) {
      this.password = hash;
      next();
    });
});

mongoose.urlSchema = new Schema({
  url : String,
  baseUrl : String,
  code : String,
  title : String,
  visits : Number,
  timestamps : { type: Date, default: Date.now }
});

mongoose.urlSchema.pre('save' ,function (next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
});

module.exports = mongoose;
