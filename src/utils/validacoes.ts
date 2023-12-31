const { validationResult } = require('express-validator');

class ValidationError extends Error {}

class NotFoundError extends Error {}

const errorHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else return next();
  };

  export default {
    errorHandler,
    ValidationError,
    NotFoundError,
  };