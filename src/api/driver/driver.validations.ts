import * as Joi from 'joi';

export const ADD_DRIVER_DTO_SCHEMA = Joi.object({
  name: Joi.string().required(),
  lat: Joi.number().required(),
  long: Joi.number().required(),
});

export const GET_DRIVER_BY_LOCATION_DTO_SCHEMA = Joi.object({
  lat: Joi.number().required(),
  long: Joi.number().required(),
  limit: Joi.number().optional(),
});
