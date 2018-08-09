const express = require('express');
const validate = require('express-validation');
const userCtrl = require('./user.controller');
const paramValidation = require('../../config/param-validation');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    .get(userCtrl.list)
    .post(validate(paramValidation.createUser), userCtrl.create)

module.exports = router;
