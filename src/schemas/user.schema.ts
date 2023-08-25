import * as Joi from 'joi';

export const indexSchema = Joi.object().keys({
  name: Joi.string().max(54).required(),
  password: Joi.string().min(8).max(30).required()
});