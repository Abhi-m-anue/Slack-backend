const unAuthenticatedError = require('./unAuthenticated');
const BadRequestError = require('./bad-request');
const NotFoundError = require('./not-found');

module.exports = {
  unAuthenticatedError,
  BadRequestError,
  NotFoundError,
};
