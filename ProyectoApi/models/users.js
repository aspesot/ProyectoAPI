var db = require('../dbconnection');

function find(callback){
    return db.query("Select * from users",callback);
}

function findById(id,callback){
    return db.query("select * from users where id=?",[id],callback);
}

function findByUsername(username,callback){
    return db.query("select * from users where username=?",[username],callback);
}

module.exports = {
    find,
    findById,
    findByUsername
}