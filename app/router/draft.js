module.exports = app => {
  app.get('/api/getDraft', 'draft.get')
  app.post('/api/saveDraft', 'draft.save')
}
