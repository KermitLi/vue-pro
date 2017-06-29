module.exports = app => {
  return class Draft extends app.Controller {
    async get (ctx) {
      let userName = ctx.query.userName
      ctx.body = await ctx.orm().draft.findOne({where: {userName}})
    }

    async save (ctx) {
      let draft = ctx.request.body
      let {title, contents, userName} = draft
      let result = await ctx.orm().draft.fondOne({where: userName})
      if (result) {
        ctx.body = await ctx.orm().draft.update({title, contents}, {where: {userName}})
      } else {
        ctx.body = await ctx.orm().draft.create(draft)
      }
    }
  }
}
