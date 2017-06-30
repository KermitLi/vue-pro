module.exports = app => {
  app.post('/api/album', 'album.create') // 创建相册
  app.get('/api/album', 'album.get') // 获取相册列表
  app.delete('/api/album', 'album.delete') // 删除相册
  app.put('/api/album', 'album.update') // 更新相册信息
}
