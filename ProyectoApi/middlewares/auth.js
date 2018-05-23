var config = require('../config');
var jwt = require('jwt-simple');
var moment = require('moment');

function isAuth(req, res, next){
    if (!req.headers.authorization){
        return res.status(403).send({message:'No tienes autorización'});
    }

    var token = req.headers.authorization.split(" ")[1];
    var payload = jwt.decode(token,config.secret_token);

    if(payload.exp <= moment().unix()){
        return res.status(401).send({message: 'El token ha expirado'});
    }
    req.user = payload.sub;
    next();
}

module.exports = {
    isAuth
}