const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const walletCtrl = require('./wallet.controller');
const util = require('../util');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/') 
      .get(util.isLoggedin, walletCtrl.getWalletId) //로그인된 사용자 지갑 아이디 조회
      .post(util.isLoggedin, walletCtrl.addWallet) //로그인된 사용자 지갑 생성

router.route('/:walletId')
      .get(util.isLoggedin, walletCtrl.get) //지갑 아이디로 지갑 정보 조회(로그인된 사용자)

router.param('walletId', walletCtrl.load);

module.exports = router;
