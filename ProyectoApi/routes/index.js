var express = require('express');
var router = express.Router();
var users = require('../controllers/users');
var auth = require('../middlewares/auth')

/* GET home page. */
router.get('/user',auth.isAuth, users.find);
router.post('/login',users.login); 

module.exports = router;
