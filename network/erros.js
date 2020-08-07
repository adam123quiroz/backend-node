const response = require('./response');

function errors(err, req, res, next) {
    console.error('[error]', err);

    const message = err.message;
    const status = err.statusCode;

    response.error(req, res, message, status);
}

module.exports = errors;