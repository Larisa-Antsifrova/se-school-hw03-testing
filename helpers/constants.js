const HttpCodes = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
};

const Ports = {
  default: 3000,
};

const Messages = {
  loginSuccess: 'You have successfully logged in.',
  registrationSuccess: 'You have successfully registered.',
  emailConflict: 'This email is already in use.',
  invalidCreds: 'Invalid credentials.',
  noJWT: 'JWT token is not provided.',
  tooManyRequests: 'Too many requrests made. Please try again later.',
  notFound: 'Not found.',
  welcomeHome:
    'Welcome! Please visit /user/create endpoint to register or /user/login to login. Once logged in you can visit /btcRate to learn what current bitcoin rate is.',
};

module.exports = { HttpCodes, Ports, Messages };
