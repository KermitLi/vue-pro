module.exports = app => {
  return class DB extends app.Controller {
    // 初始化数据库
    async init (ctx) {
      await ctx.orm().sync()
      ctx.toApiMessage(0)
    }
  }
}
