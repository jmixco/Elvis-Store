'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const appmodules = require('./app');
const passport = require('passport');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);
// Initialize passport for use
app.use(passport.initialize());


// Bring in defined Passport Strategy
appmodules.auth(passport);

app.use('/api', appmodules.router);


app.listen(app.get('port'), console.log('person service running on port ', app.get('port')));