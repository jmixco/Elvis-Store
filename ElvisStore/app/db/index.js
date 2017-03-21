'use strict';
const config = require('../config');
const Mongoose = require('mongoose').connect(config.dbURI);
const User = require('./user');
const Product = require('./product');
const PurchaseHistory = require('./purchaseHistory');


//Turn the schema into a usable model
let userModel = Mongoose.model('User', User);
let productModel = Mongoose.model('Product', Product);
let purchaseHistoryModel = Mongoose.model('PurchaseHistory', PurchaseHistory);
module.exports = {
    Mongoose,
    userModel,
    productModel,
    purchaseHistoryModel
    
};