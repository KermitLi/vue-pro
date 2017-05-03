const app = require('koa')();
const koa = require('koa-router')(),
  logger = require('koa-logger'),
  json = require('koa-json'),
  path = require('path'),
  staticPath = require('koa-static');

const api = require('./routes/api');
const db = require('./middleware/orm.js');
const jwt = require('koa-jwt');

app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());
app.use(db.orm);
app.use(staticPath(path.join(__dirname, '/public')));
app.use(jwt({
  secret: 'Kermit'
}).unless({
  path: ['/api/checkName', '/api/register', '/api/login', '/api/initDB', '/api/getArticle', '/api/deleteArticle', '/api/uploadPhoto', '/api/avatar']
}));

app.use(function* (next) {
  let start = new Date;
  yield next;
  let ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

koa.use('/api', api.routes())

app.use(koa.routes());

app.listen(3000, function () {
  console.log('server start!')
});
module.exports = app;
