var router = require('koa-router')();
var connectDb = require('../config/db.js');

router.get('/', function *(ctx,next){

  var db = yield connectDb();
  this.body = yield db.collection('users').find({}).toArray();
});

module.exports = router;
