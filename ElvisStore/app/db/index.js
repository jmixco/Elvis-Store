'use strict';
const config = require('../config');
const Mongoose = require('mongoose').connect(config.dbURI);
const User = require('./user');


//Turn the schema into a usable model
let userModel = Mongoose.model('User', User);

module.exports = {
    Mongoose,
    userModel
};