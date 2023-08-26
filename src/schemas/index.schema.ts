import * as Joi from 'joi';

export const userSchema = Joi.object().keys({
  name: Joi.string().max(54).required(),
  password: Joi.string().min(3).max(30).required()
});

export const postSchema = Joi.object().keys({
  title: Joi.string().max(84).required(),
  content: Joi.string().max(520).required()
});