const Joi = require('@hapi/joi');

//const auth = {
exports.add_menu = Joi.object().keys({
  name: Joi.string().required()
});
exports.add_category = Joi.object().keys({
    name: Joi.string().required()
  });
exports.add_item = Joi.object().keys({
    name: Joi.string().required(),
  

  });