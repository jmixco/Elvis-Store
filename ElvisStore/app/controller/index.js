'use strict';
const express = require('express')
const router = express.Router();


router.use('/', require('./person'),
    require('./auth'),
    require('./register'),
    require('./test'));

module.exports = router;