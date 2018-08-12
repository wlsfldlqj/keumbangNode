const Promise = require('bluebird');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },       
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },    
    mobile: {
        type: String,
        required: true,
        // match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
    },
    birthday: {
        type: String,
        required: true
    },    
    created: {
        type: Date,
        default: Date.now
    }
});

UserSchema.method({
    authenticate: function (password) {
        var user = this;
        return bcrypt.compareSync(password,user.password);
    }
});

UserSchema.statics = {
    get(id) {
        return this.findById(id)
        .exec()
        .then((user) => {
            if (user) {
                return user;
            }
            const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
            return Promise.reject(err);
        });
    },
    getByEmail(email){
        return this.findOne({'email': email})
        .exec()
        .then((user)=>{
            if (user){
                return user;
            }else return null;
        });
    },
    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
        .sort({ created: -1 })
        .skip(+skip)
        .limit(+limit)
        .exec();
    }
};

UserSchema.pre('save', function (next){
    var user = this;
    if(!user.isModified('password')){ //기존 document의 password 필드가 변경되었는지 체크. 신규가입 / 정보수정
        return next();
    } else {
        user.password = bcrypt.hashSync(user.password);
        return next();
    }
});
  
module.exports = mongoose.model('User', UserSchema);