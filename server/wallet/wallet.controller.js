const util = require('../util');
const Wallet = require('./wallet.model');

function load(req, res, next, id) {
    Wallet.get(id) 
        .then((wallet) => {
            req.wallet = wallet;
            return next();
        })
        .catch(e => next(e));
}

function get(req, res) {
    return res.json(util.successTrue(req.wallet));
}

//user_id로 지갑 아이디 조회
function getWalletId(req, res, next) { 
    Wallet.getAddr(req.decoded._id)
        .then(wallet => {
            if(wallet == null)
                res.json(util.successFalse(null, "생성된 지갑이 없습니다."))
            else
                res.json(util.successTrue(wallet._id)) //지갑 아이디만 전달
                // res.json(util.successTrue({_id: wallet._id, addr: wallet.addr})) //지갑 아이디, 주소 전달
        })
        .catch(e => next(e));
}

//지갑 생성
function addWallet(req, res, next){
    var user_id = req.decoded._id;
    Wallet.getAddr(user_id) //이미 지갑이 존재하는지 조회
        .then(wallet => {
            if(wallet == null){
                var addr = getWalletAddr(); //w3.js 로 지갑생성하는 부분 코드로 변경해야 함!!!!!
                const wallet = new Wallet({
                    user_id: user_id,
                    addr: addr,
                    krw: 0,
                    gt: 0,
                    tx: 0,    
                });
                wallet.save() 
                    .then(wallet => {
                        res.json(util.successTrue(wallet))
                    })
                    .catch(e => next(e));  
            }
            else
                res.json(util.successTrue(wallet._id)) //이미 생성된 지갑 아이디만 전달 
        })
        .catch(e => next(e));    
}

function getWalletAddr(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 20; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

/************입출금관련************/

function depositKrw(req, res, next){ //돈 입금. 결제모듈에서 결제 완료 후 호출됨
    
    var user_id = req.decoded._id;
    var krw = req.body.krw

    Wallet.getAddr(user_id) //이미 지갑이 존재하는지 조회
        .then(wallet => {
            if(wallet){
                Wallet.depositKrw(wallet._id, krw)
                    .then(wallet => {
                        res.json(util.successTrue({krw: wallet.krw}))
                    })
            }
            else{
                res.json(util.successFalse(null, "생성된 지갑이 없습니다."))
            }
        })    
}

function withdrawKrw(req, res, netxt){ //돈 출금. 실제 출금 완료 후 호출
    var user_id = req.decoded._id;
    var krw = req.body.krw
    Wallet.getAddr(user_id) //이미 지갑이 존재하는지 조회
        .then(wallet => {
            if(wallet){
                if(wallet.krw >= krw){
                    Wallet.withdrawKrw(wallet._id, krw)
                        .then(wallet => {
                            res.json(util.successTrue({krw: wallet.krw}))
                        })
                }else{
                    res.json(util.successFalse(null, "출금 요청 금액이 현재 보유 금액보다 큽니다."))
                }
            }
            else{
                res.json(util.successFalse(null, "생성된 지갑이 없습니다."))
            }
        })        
}


module.exports = { load, get, getWalletId, addWallet, depositKrw, withdrawKrw };
