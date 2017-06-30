module.exports = app => {
  require('./router/user')(app)
  require('./router/album')(app)
  require('./controller/article')(app)
  require('./controller/db')(app)
  require('./controller/draft')(app)
  require('./controller/news')(app)
  require('./controller/photo')(app)
  require('./controller/user')(app)
}
