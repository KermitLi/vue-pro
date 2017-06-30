module.exports = app => {
  app.post('/api/checkName', 'user.checkName') // 检查用户名是否存在
  app.post('/api/login', 'user.login')  // 用户登录
  app.post('/api/register', 'user.register') // 用户注册
  app.put('/api/resetPwd', 'user.resetPwd') // 重置密码
  app.get('/api/avatar', 'user.avatar') // 更新用户信息
  app.get('/api/userInfo', 'user.get') // 获取用户信息
  app.put('/api/userInfo', 'user.update') // 获取用户头像
}
