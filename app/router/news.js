module.exports = app => {
  app.get('/api/news', 'news.get')
}
