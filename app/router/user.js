module.exports = app => {
  app.post('/api/checkName', 'user.checkName')
  app.post('/api/login', 'user.login')
  app.post('/api/register', 'user.register')
  app.put('/api/resetPwd', 'user.resetPwd')
  app.get('/api/avatar', 'user.avatar')
  app.get('/api/userInfo', 'user.get')
  app.put('/api/updateUserInfo', 'user.update')
}
