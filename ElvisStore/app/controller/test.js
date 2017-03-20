'use strict';
const express = require('express');
const passport = require('passport');
const router = express.Router();

// Protect dashboard route with JWT
router.get('/test', passport.authenticate('jwt', { session: false }), function (req, res) {
    res.status(200);
    res.send('It worked! User id is: ' + req.user._id + '.');
});

module.exports = router;