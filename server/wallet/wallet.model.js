const Promise = require('bluebird');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const WalletSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    addr: {
        type: String,
        required: true
    },
    krw: {
        type: Number,
        required: true
    },
    gt: {
        type: Number,
        required: true
    },
    tx: {
        type: Number,
        required: true
    },    
    created: {
        type: Date,
        default: Date.now
    }
});

WalletSchema.method({

});

WalletSchema.statics = {
    get(id) {
        return this.findById(id)
        .exec()
        .then((wallet) => {
            if (wallet) {
                return wallet;
            }
            const err = new APIError('No such wallet exists!', httpStatus.NOT_FOUND);
            return Promise.reject(err);
        });
    },    
    getAddr(user_id) {
        return this.findOne({'user_id': user_id})
        .exec()
        .then((wallet)=>{
            if (wallet){
                return wallet;
            }else return null;
        });
    },
};
  
module.exports = mongoose.model('Wallet', WalletSchema);