import * as Joi from 'joi';

export const ADD_PASSENGER_SCHEMA = Joi.object({
  name: Joi.string().required(),
});