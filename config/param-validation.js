const Joi = require('joi');

module.exports = {
  // POST /api/users
  createUser: {
    body: {
        email: Joi.string().required(),
        name: Joi.string().required(),
        password: Joi.string().required(),
        mobile: Joi.string().required()
        // mobile: Joi.string().regex(/^[1-9][0-9]{11}$/).required()
    }
  }
};
