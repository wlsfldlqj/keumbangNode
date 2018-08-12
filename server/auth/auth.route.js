const express = require('express');
const util = require('../util');
const jwt = require('jsonwebtoken');
const User = require('../user/user.model');
const router = express.Router(); // eslint-disable-line new-cap
require('dotenv').config()

router.post('/login',
    function(req,res,next){
        var isValid = true;
        var validationError = {
            name:'ValidationError',
            errors:{}
        };
        if(!req.body.email){
            isValid = false;
            validationError.errors.email = {message:'Email is required!'};
        }
        if(!req.body.password){
            isValid = false;
            validationError.errors.password = {message:'Password is required!'};
        }
        if(!isValid) return res.json(util.successFalse(validationError));
        else next();
    },
    function(req,res,next){
        User.findOne({email:req.body.email})
        .exec(function(err,user){
            if(err) return res.json(util.successFalse(err));
            else if(!user||!user.authenticate(req.body.password))
                return res.json(util.successFalse(null,'Email or Password is invalid'));
            else {
                var payload = {
                    _id : user._id
                };
                var secretOrPrivateKey = process.env.JWT_SECRET;
                var options = {expiresIn: 60*60*24};
                jwt.sign(payload, secretOrPrivateKey, options, function(err, token){
                    if(err) return res.json(util.successFalse(err));
                    res.json(util.successTrue({ "_id" : payload._id, token : token}));
                });
            }
        });
    }
);

module.exports = router;