module.exports = app => {
  app.post('/api/article', 'article.post')// 发表文章
  app.get('/api/article', 'article.get')// 获取个人或全部文章列表
  app.put('/api/article', 'article.update')// 更新文章内容
  app.delete('/api/article', 'article.delete')// 删除文章
  app.get('/api/articleContent', 'article.getById')// 获取单个文章的内容
}
