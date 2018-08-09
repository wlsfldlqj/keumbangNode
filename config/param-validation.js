const Joi = require('joi');

module.exports = {
  // POST /api/users
  createUser: {
    body: {
        name: Joi.string().required(),
        mobile: Joi.string().required()
        // mobile: Joi.string().regex(/^[1-9][0-9]{11}$/).required()
    }
  }
};
