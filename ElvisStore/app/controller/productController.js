'use strict';
const url = require('url');
const express = require('express');
const passport = require('passport');
const router = express.Router();
const middleware = require('../middleware');
const Product = require('../model').Product;
function resolveProducts(req, res, promise) {
    promise.then((products) => {
        res.status(200);
        res.json(products);
    }).catch(error => {
        errorResponse(res, error);
    });
}
function errorResponse(res, error) {
    let content = { success: false, message: error };

    //if the response has ok code
    if (res.statusCode >= 200 && res.statusCode <= 299) {
        //if the error contains statuscode
        if (error.statusCode && !isNaN(parseFloat(error.statusCode))) {
            res.status(error.statusCode);
            content.message = error.message;
        } else {
            res.status(400);
        }
        
    }
    res.json(content);
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
router.get('/product/:id', function (req, res) {

    Product.findById(req.params.id)
        .then(product => {
            if (product) {
                res.status(200);
                res.json(product);
            } else {
                res.status(404);
                throw 'Product not found.';
            }

        })
        .catch(error => {
            errorResponse(res, error);
        });

});
router.post('/product/', middleware.adminRequired, function (req, res) {
    let newProduct = req.body;
    let uri = url.parse(req.url);
    Product.create(newProduct.name, newProduct.cost, newProduct.quantity)
        .then(product => {
            res.status(201);
            res.set({ 'Location': `${uri.path}/${product._id}` });
            res.json(product);
        })
        .catch(error => {
            errorResponse(res, error);
        });
});
router.delete('/product/:id', middleware.adminRequired, function (req, res) {

    Product.deleteById(req.params.id)
        .then(product => {
            if (product) {
                res.status(204);
                res.end();
            } else {
                res.status(404);
                res.end();
            }

        })
        .catch(error => {
            errorResponse(res, error);
        });
});

router.patch('/product/:id/stock/:stock', middleware.adminRequired, function (req, res) {
    Product.setStockById(req.params.id, req.params.stock)
        .then(product => {
            res.status(200);
            res.send(product);
        })
        .catch(error => {
            errorResponse(res, error);
        });
});

router.patch('/product/:id/price/:price', middleware.adminRequired, function (req, res) {
    Product.setCostById(req.params.id, req.user._id, req.params.price)
        .then(product => {
            res.status(200);
            res.send(product);
        })
        .catch(error => {
            errorResponse(res, error);
        });
});

router.put('/product/:id/buy/:quantity', middleware.loginRequired, function (req, res) {

    Product.buy(req.params.id, req.user._id, req.params.quantity)
        .then((product) => {
            res.status(200);
            res.send(product);
        })
        .catch(error => {
            errorResponse(res, error);
        });

});

// like
router.put('/product/:id/like/', middleware.loginRequired, function (req, res) {
    like(true, req, res);
});

//remove like
router.delete('/product/:id/like/', middleware.loginRequired, function (req, res) {
    like(false, req, res);
});
function like(doLike, req, res) {
    Product.likeById(req.params.id, req.user._id, doLike)
        .then((product) => {
            res.status(200);
            res.send(product);
        })
        .catch(error => {
            errorResponse(res, error);
        });
}

module.exports = router;