module.exports = app => {
  app.get('/api/initDB', 'db.init') // 初始化数据库
}
