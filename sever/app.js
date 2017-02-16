var Koa = require('koa');
var app = new Koa();
  var koa = require('koa-router')()
  , logger = require('koa-logger')
  , json = require('koa-json')
  , views = require('koa-views')
  , onerror = require('koa-onerror');

var index = require('./routes/index');
var users = require('./routes/users');

app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());
var connectDb = require('./config/db.js')
app.use(function *(next){
  var data = '123';
  var db = yield connectDb();
  this.body = yield db.collection('users').find({}).toArray();
});
// app
//   .use(index.routes())
//   .use(index.allowedMethods());
// app.use(require('koa-static')(__dirname + '/public'));


// mount root routes
// app.use(koa.routes());

module.exports = app;
