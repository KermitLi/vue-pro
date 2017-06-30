module.exports = app => {
  require('./router/user')(app)
  require('./router/album')(app)
  require('./router/article')(app)
  require('./router/db')(app)
  require('./router/draft')(app)
  require('./router/news')(app)
  require('./router/photo')(app)
}
