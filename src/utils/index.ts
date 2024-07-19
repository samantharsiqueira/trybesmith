const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
};

const ERROR_MSG = {
  PRODUCT_NAME_NOT_FOUND: '"name" is required',
  PRODUCT_NAME_LENGHT_NOT_VALID: '"name" length must be at least 5 characters long',
  PRODUCT_NAME_NOT_VALID: '"name" must be a string',
  PRICE_NOT_FOUND: '"price" is required',
  PRICE_NAME_NOT_VALID: '"price" must be a string',
  PRICE_NAME_LENGHT_NOT_VALID: '"price" length must be at least 3 characters long',
  USER_ID_REQUIRED: '"userId" is required',
  USER_ID_NOT_VALID: '"userId" must be a number',
  USER_ID_NOT_FOUND: '"userId" not found',
};

const ROUTE = {
  PRODUCTS: '/products',
  USER: '/users',
  LOGIN: '/login',
};

module.exports = { 
  HTTP_STATUS,
  ERROR_MSG,
  ROUTE,
};