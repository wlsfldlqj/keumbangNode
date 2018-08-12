const jwt = require('jsonwebtoken');
const util = require('../util');
const User = require('./user.model');
const bcrypt = require('bcrypt-nodejs');

function load(req, res, next, id) {
    User.get(id)
        .then((user) => {
            req.user = user;
            return next();
        })
        .catch(e => next(e));
}
  
function get(req, res) {
    return res.json(req.user);
}

function list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query;
    User.list({ limit, skip })
        .then(users => res.json(users))
        .catch(e => next(e));
}

function create(req, res, next) {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        mobile: req.body.mobile,
        birthday: req.body.birthday
    });

    User.getByEmail(req.body.email) //중복 이메일 검사
        .then(userData => {
            if(userData == null){
                user.save() //회원 데이터 입력
                    .then(savedUser => {
                        //res.json(savedUser) //가입 완료 후 데이터를 바로 넘길 경우
                        //access_token을 함께 넘길 경우 현재 주석 아래 코드
                        var payload = {
                            _id : savedUser._id
                        };
                        var secretOrPrivateKey = process.env.JWT_SECRET;
                        var options = {expiresIn: 60*60*24};
                        jwt.sign(payload, secretOrPrivateKey, options, function(err, token){
                            if(err) return res.json(util.successFalse(null,'회원가입 기능에 문제가 생겼습니다. 다시 시도해 주세요(access_token)'));
                            savedUser = savedUser.toObject(); //Mongoose Document 객체를 Object로 변경해서 token 추가
                            savedUser.access_token = token
                            res.json(savedUser)
                        });
                    })
                    .catch(e => next(e));                
            }else{
                res.json(util.successFalse(null,'이미 가입된 이메일입니다.'));
            }
        })
        .catch(e => next(e));    
}

function update(req, res, next) {
    const user = req.user;
    user.password = req.body.password;
    user.save()
        .then(savedUser => res.json(savedUser))
        .catch(e => next(e));
}

function checkPassword(req, res, next){
    const result = bcrypt.compareSync(req.body.password, req.user.password);
    if(result) res.json(util.successTrue());
    else res.json(util.successFalse(null, '패스워드가 일치하지 않습니다.'));
}

module.exports = { load, get, list, create, update, checkPassword };
