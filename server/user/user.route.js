const express = require('express');
const validate = require('express-validation');
const userCtrl = require('./user.controller');
const paramValidation = require('../../config/param-validation');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    // .get(userCtrl.list) //사용자 전체 목록
    .post(validate(paramValidation.createUser), userCtrl.create) //회원 가입

router.route('/:userId')
    .get(userCtrl.get) //내 정보 보기
    .put(validate(paramValidation.updateUser), userCtrl.update) //내 정보 업데이트

router.param('userId', userCtrl.load);

module.exports = router;
