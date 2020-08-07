const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');

const secret = config.jwt.secret;

const check = {
    own: function (req, owner) {
        const decoded = decodeHeader(req);
        console.log('decoded', decoded);

        if (decoded.id !== owner) {
            throw error('can not do this', 401);
        }
    }
}

function verify(token) {
    return jwt.verify(token, secret);
}

function getToken(auth) {
    if (!auth) {
        throw new Error('Nothing on token');
    }
    if (auth.indexOf('Bearer ') === -1) {
        throw new Error('Format Invalid');
    }
    let token = auth.replace('Bearer ', '');
    return token;

}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;
    return decoded;
}

function sign(data) {
    return jwt.sign(data, secret);
}

module.exports = {
    sign,
    check
}