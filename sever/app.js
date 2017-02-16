var app = require('koa')();
  var koa = require('koa-router')()
  , logger = require('koa-logger')
  , json = require('koa-json')
  , views = require('koa-views')
  , onerror = require('koa-onerror');

var api = require('./routes/api');

app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());
var connectDb = require('./config/db.js')
app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

koa.use('/api',api.routes());

app.use(koa.routes());



module.exports = app;
