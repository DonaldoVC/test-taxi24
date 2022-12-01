import * as Joi from 'joi';

export const CREATE_REQUEST_SCHEMA = Joi.object({
  date: Joi.date().required(),
  cost: Joi.number().required(),
  driver: Joi.string().required(),
  passenger: Joi.string().required(),
  from: Joi.object({
    lat: Joi.number().required(),
    long: Joi.number().required(),
  }),
  to: Joi.object({
    lat: Joi.number().required(),
    long: Joi.number().required(),
  }),
});