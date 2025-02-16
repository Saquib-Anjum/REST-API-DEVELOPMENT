import customErrorHandler from '../services/customErrorHandler.js';
const DEBUG_MODE = process.env.DEBUG_MODE;
import Joi from 'joi';
const { ValidationError } = Joi;

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;

  let data = {
    message: 'Internal server error',
    ...(DEBUG_MODE === 'true' && { originalError: err.message })
  };

  if (err instanceof ValidationError) {
    statusCode = 422;
    data = {
      message: err.message
    };
  }

  if (err instanceof customErrorHandler) {
    statusCode = err.status;
    data = {
      message: err.message
    };
  }

  return res.status(statusCode).json(data);
};

export default errorHandler;
