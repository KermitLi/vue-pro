var router = require('koa-router')();


var initDB = require('../controllers/initDB.js');


var login = require('../controllers/login.js');
var checkName = require('../controllers/checkName.js');
var register = require('../controllers/register.js');
var resetPwd = require('../controllers/resetPwd.js');
var getAvatar = require('../controllers/getAvatar.js');


var postArticle = require('../controllers/postArticle.js');
var getArticle = require('../controllers/getArticle.js');

var deleteArticle = require('../controllers/deleteArticle.js');

var uploadPhoto = require('../controllers/uploadPhoto.js');
var getPhoto = require('../controllers/getPhoto.js');

router.get('/initDB', initDB);
router.post('/login', login); //登录
router.post('/checkName', checkName); //检测注册姓名时的合法性
router.post('/register', register); //注册
router.post('/resetPwd', resetPwd); //重置密码
router.get('/avatar', getAvatar); //获取头像

//文章系列
router.post('/postArticle', postArticle); //发表文章
router.get('/getArticle', getArticle); //获取文章
router.get('/deleteArticle', deleteArticle);

//图片上传
router.post('/uploadPhoto', uploadPhoto);
router.post('/getPhoto', getPhoto);

module.exports = router;
