import Joi from 'joi';
import { ERROR_MSG } from './index';

const productSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .required()
    .messages({
      'string.base': ERROR_MSG.PRODUCT_NAME_NOT_VALID,
      'string.empty': ERROR_MSG.PRODUCT_NAME_NOT_FOUND,
      'string.min': ERROR_MSG.PRODUCT_NAME_LENGHT_NOT_VALID,
    }),
  price: Joi.string()
    .min(3)
    .required()
    .messages({
      'string.base': ERROR_MSG.PRICE_NAME_NOT_VALID,
      'string.empty': ERROR_MSG.PRICE_NOT_FOUND,
      'string.min': ERROR_MSG.PRICE_NAME_LENGHT_NOT_VALID,
    }),
  userId: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': ERROR_MSG.USER_ID_NOT_VALID,
      'number.required': ERROR_MSG.USER_ID_REQUIRED,
      'number.integer': ERROR_MSG.USER_ID_NOT_VALID,
    }),
});

export default productSchema;
