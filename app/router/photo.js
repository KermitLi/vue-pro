module.exports = app => {
  app.get('/api/photos', 'photo.get')
  app.delete('/api/photo', 'photo.delete')
  app.post('/api/upload', 'photo.save')
  app.post('/api/uploadPhoto', 'photo.upload')
}
