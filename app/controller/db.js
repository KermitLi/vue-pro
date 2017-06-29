module.exports = app => {
  return class DB extends app.Controller {
    async init (ctx) {
      await ctx.orm().sync()
      ctx.toApiMessage(0)
    }
  }
}
