const express = require('express');
const bodyParser = require('body-parser');
const routes = require('../index.route');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'content-type, x-access-token');
    next();
});

app.listen(3000, function () {
    console.log('connect 3000 port');
});

app.use('/api', routes);

module.exports = app;