const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sessionRouter = require('./routers/session-router');
const NotFound = require('./errors').NotFound;
const pug = require('pug');

const template = 'views/header.pug';

const port = process.env.PORT || 8000;

app

.use(bodyParser.json())

.use(express.static('resources'))

.set('view engine', 'pug')

.get('/', function(req, res, next) {
    res.redirect('/sessions');
})

.use('/sessions', sessionRouter)

.use(function(req, res, next) {
    next(new NotFound());
})

.use(function(err, req, res, next) {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).end(err.message);
})

.listen(port, function() {
    console.log(`Pe.A.R. web application server started on: ${port}\n`);
});
