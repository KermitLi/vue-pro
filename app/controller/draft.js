module.exports = app => {
  return class Draft extends app.Controller {
    // 获取草稿
    async get (ctx) {
      let userName = ctx.query.userName
      ctx.body = await ctx.orm().draft.findOne({where: {userName}})
    }

    // 保存草稿
    async save (ctx) {
      let draft = ctx.request.body
      let {title, contents, userName} = draft
      let result = await ctx.orm().draft.findOne({where: {userName}})
      if (result) {
        ctx.body = (await ctx.orm().draft.update({title, contents}, {where: {userName}}))[0]
      } else {
        ctx.body = await ctx.orm().draft.create(draft)
      }
    }
  }
}
