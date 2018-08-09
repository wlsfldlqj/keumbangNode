const Promise = require('bluebird');
const mongoose = require('mongoose');

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
    list({ skip = 0, limit = 50 } = {}) {
      return this.find()
        .sort({ created: -1 })
        .skip(+skip)
        .limit(+limit)
        .exec();
    }
  };
  
  module.exports = mongoose.model('User', UserSchema);