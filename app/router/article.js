module.exports = app => {
  app.post('/api/postArticle', 'article.post')
  app.get('/api/getArticle', 'article.get')
  app.post('/api/updateArticle', 'article.update')
  app.delete('/article', 'article.delete')
  app.get('/api/getArticleContent', 'article.getById')
}