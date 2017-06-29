module.exports = app => {
  app.post('/api/createAlbum', 'album.create')
  app.get('/api/getAlbums', 'album.get')
  app.delete('/api/album', 'album.delete')
  app.post('/api/updateAlbum', 'album.update')
}
