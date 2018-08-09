const express = require('express');
const bodyParser = require('body-parser');
const routes = require('../index.route');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
    console.log('connect 3000 port');
});

app.use('/api', routes);

module.exports = app;