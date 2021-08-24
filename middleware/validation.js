const Joi = require('joi');

const { HttpCodes } = require('../helpers/constants');
const {
  validationConfig: {
    minNameLength,
    maxNameLength,
    minDomainSegments,
    minPasswordLength,
  },
} = require('../configs/validation-config');

const schemaRegisterUser = Joi.object({
  name: Joi.string().trim().min(minNameLength).max(maxNameLength).required(),
  email: Joi.string()
    .email({
      minDomainSegments: minDomainSegments,
    })
    .required(),
  password: Joi.string().trim().min(minPasswordLength).required(),
});

const schemaLoginUser = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const validateRequestAgainstSchema = async (schema, request, next) => {
  try {
    await schema.validateAsync(request);
    next();
  } catch (error) {
    next({
      status: HttpCodes.BAD_REQUEST,
      message: error.message,
    });
  }
};

const validateRegisterUser = (req, res, next) => {
  return validateRequestAgainstSchema(schemaRegisterUser, req.body, next);
};

const validateLoginUser = (req, res, next) => {
  return validateRequestAgainstSchema(schemaLoginUser, req.body, next);
};

module.exports = { validateRegisterUser, validateLoginUser };
