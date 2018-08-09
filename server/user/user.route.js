const express = require('express');
const validate = require('express-validation');
const userCtrl = require('./user.controller');
const paramValidation = require('../../config/param-validation');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    .get(userCtrl.list) //사용자 전체 목록
    .post(validate(paramValidation.createUser), userCtrl.create) //사용자 입력

router.route('/:userId')
    .get(userCtrl.get) //사용자 1명 상세보기
    .put(validate(paramValidation.updateUser), userCtrl.update) //사용자 1명 업데이트

router.param('userId', userCtrl.load);

module.exports = router;
