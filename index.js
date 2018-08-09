const app = require('./config/express');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/keumbang', null).then(
	() => { console.log('connect mongoose success') },
	err => { console.log('connect mongoose error') }
);

module.express = app;