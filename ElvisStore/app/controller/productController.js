'use strict';
const express = require('express');
const passport = require('passport');
const router = express.Router();
const middleware = require('../middleware');
const Product = require('../model').Product;
function resolveProducts(req, res, promise) {
    promise.then((products) => {
        res.status(200);
        res.json(products);
    })
        .catch(error => {
            res.status(400);
            res.send({ message: error });
        });
}
router.get('/product/', function (req, res) {

    let sort = req.query.sort;
    let name = req.query.name;
    let products = [];
    if (name) {
        resolveProducts(req, res, Product.filterByName(name, sort));
           
    } else {
        resolveProducts(req, res, Product.all(sort));

    }

});


router.put('/product/:id/buy/:quantity', middleware.loginRequired, function (req, res) {

    Product.buy(req.param.id, req.user.id, req.param.quantity)
        .then((purchase) => {
            res.status(200);
            res.send({ success: false, message: purchase });
        })
        .catch(error => {
            res.status(400);
            res.send({ success: false, message: error });
        });

});

module.exports = router;