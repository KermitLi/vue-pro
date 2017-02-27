var router = require('koa-router')();
var login = require('../controllers/login.js');
var checkName = require('../controllers/checkName.js');
var register = require('../controllers/register.js');

router.post('/login',login);
router.post('/checkName',checkName);
router.post('/register',register);

module.exports = router;
