var router = require('koa-router')();


var initDB = require('../controllers/initDB.js');


var login = require('../controllers/login.js');
var checkName = require('../controllers/checkName.js');
var register = require('../controllers/register.js');
var resetPwd = require('../controllers/resetPwd.js');
var getAvatar = require('../controllers/getAvatar.js');
var getUserInfo = require('../controllers/getUserInfo.js');
var updateUserInfo = require('../controllers/updateUserInfo.js');


var postArticle = require('../controllers/postArticle.js');
var getArticle = require('../controllers/getArticle.js');
var updateArticle = require('../controllers/updateArticle.js');
var deleteArticle = require('../controllers/deleteArticle.js');
var saveDraft = require('../controllers/saveDraft.js');
var getDraft = require('../controllers/getDraft.js');
var getArticleContent = require('../controllers/getArticleContent.js');

var createAlbum = require('../controllers/createAlbum.js');
var updateAlbum = require('../controllers/updateAlbum.js');
var getAlbums = require('../controllers/getAlbums.js');
var deleteAlbum = require('../controllers/deleteAlbum.js');
var uploadPhoto = require('../controllers/uploadPhoto.js');
var upload = require('../controllers/upload.js');
var getPhotos = require('../controllers/getPhotos.js');
var deletePhoto = require('../controllers/deletePhoto.js');

var pachong = require('../controllers/pachong.js');

router.get('/initDB', initDB);
router.post('/login', login); //登录
router.post('/checkName', checkName); //检测注册姓名时的合法性
router.post('/register', register); //注册
router.post('/resetPwd', resetPwd); //重置密码
router.get('/avatar', getAvatar); //获取头像
router.get('/userInfo', getUserInfo);
router.get('/updateUserInfo', updateUserInfo);

//文章系列
router.post('/postArticle', postArticle); //发表文章
router.get('/getArticle', getArticle); //获取文章
router.post('/updateArticle', updateArticle); //更新文章
router.delete('/article', deleteArticle);
router.get('/getDraft', getDraft);
router.post('/saveDraft', saveDraft);
router.get('/getArticleContent', getArticleContent)

//图片上传
router.post('/createAlbum', createAlbum);
router.get('/getAlbums', getAlbums);
router.delete('/album', deleteAlbum);
router.post('/updateAlbum', updateAlbum);
router.post('/uploadPhoto', uploadPhoto);
router.post('/upload', upload);
router.get('/photos', getPhotos);
router.delete('/photo', deletePhoto);

router.get("/news", pachong);


module.exports = router;
