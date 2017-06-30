module.exports = app => {
  app.get('/api/draft', 'draft.get') // 获取草稿
  app.put('/api/draft', 'draft.save') // 保存草稿
}
