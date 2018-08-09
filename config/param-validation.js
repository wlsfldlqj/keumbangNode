const Joi = require('joi');

module.exports = {
  // POST /api/users
  createUser: {
    body: {
        email: Joi.string().required(),
        password: Joi.string().required(),
        name: Joi.string().required(),
        mobile: Joi.string().required(),
        birthday: Joi.string().required(),
        // mobile: Joi.string().regex(/^[1-9][0-9]{11}$/).required()
    }
  },
  updateUser: {
    body: {
        name: Joi.string().required(),
        mobile: Joi.string().required(),
        birthday: Joi.string().required(),
    }
  }  
};
