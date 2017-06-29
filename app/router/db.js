module.exports = app => {
  app.get('/api/initDB', 'db.init')
}
