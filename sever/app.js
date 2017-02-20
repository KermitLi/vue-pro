const app = require('koa')();
  const koa = require('koa-router')()
  , logger = require('koa-logger')
  , json = require('koa-json');

const api = require('./routes/api');
const db = require('./middleware/orm.js');

app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());
app.use(db.orm);

app.use(function *(next){
  let start = new Date;
  yield next;
  let ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

koa.use('/api',api.routes())

app.use(koa.routes());

app.listen(3000,function(){console.log('server start!')});
module.exports = app;
