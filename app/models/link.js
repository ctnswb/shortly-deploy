var mongoose = require('../config');

var Link = mongoose.model('Link', mongoose.urlSchema);

module.exports = Link;
