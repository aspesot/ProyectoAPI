var config = require('../config');
var jwt = require('jwt-simple');
var moment = require('moment');

function createToken(user) {
    var payload = {
        sub: user.id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix(),
    }

    return jwt.encode(payload,config.secret_token)
    //return jwt.sign(_.omit(user, 'password'), config.secretKey, { expiresIn: 60 * 60 * 5 });
}

module.exports = {
    createToken
}