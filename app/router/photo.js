module.exports = app => {
  app.get('/api/photo', 'photo.get') // 获取相册图片
  app.delete('/api/photo', 'photo.delete')
  app.post('/api/upload', 'photo.save')
  app.post('/api/uploadPhoto', 'photo.upload')
}
