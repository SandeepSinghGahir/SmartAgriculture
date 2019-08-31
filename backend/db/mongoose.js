var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://root:root123@ds133275.mlab.com:33275/smartagdatabase');
module.exports = {mongoose};