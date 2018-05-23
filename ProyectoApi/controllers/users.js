var users = require('../models/users');
var service = require('../services/auth');


function find(req, res, next) {

    if (req.params.id) {
        users.findById(req.params.id, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    }

    else {
        users.find(function (err, rows) {

            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    }
};

function login(req, res) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send("You must send the username and the password");
    }

    users.findByUsername(req.body.username, function (err, rows) {
        if (err) {
            res.status(500).send("Error al consultar usuario en la BD");
        } else if (!rows[0]) {
            return res.status(401).send("El usuario no existe.");
        } else if (rows[0].password !== req.body.password) {
            return res.status(401).send("El usuario o password no son correctos");
        } else {
            res.status(201).send({ id_token: service.createToken(rows[0]) });
        }
    });
};

module.exports = {
    find,
    login
}