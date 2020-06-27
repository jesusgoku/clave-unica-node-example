import logger from './logger';

function home(_req, res) {
  res.redirect('/login');
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, _req, res, _next) {
  logger.error(err);

  res.send(err.message);
}

export { home, errorHandler };
