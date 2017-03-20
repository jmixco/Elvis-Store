'use strict';
const config = require('../config');
const Mongoose = require('mongoose').connect(config.dbURI);

//Turn the schema into a usable model
let userModel = Mongoose.model('User', require('./user'));

module.exports = {
    Mongoose,
    userModel
};