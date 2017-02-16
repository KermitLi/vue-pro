var router = require('koa-router')();
var fs = require('fs');
var connectDb = require('../config/db.js');

router.get('/', function *(ctx,next){

  var data = '123';
  var db = yield connectDb();
  console.log(db)
  ctx.body = '434';
});

module.exports = router;
