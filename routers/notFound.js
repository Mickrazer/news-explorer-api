const { ErrorNotFound } = require('../moduls/errors');

const someNotFound = (req, res) => {
  res.set('Content-Type', 'application/json');
  res.status(404).send('{ "message": "Ресурс не найден" }');
};

const error = (err, req, res, next) => {
  let someError = err;
  if (/Cast to [a-z]+ failed/i.test(someError.message)) {
    someError = new ErrorNotFound();
  }
  const { statusCode = 500, message } = someError;
  res.status(statusCode).send({ message });
  return next();
};

module.exports = { error, someNotFound };