module.exports = app => {
  return class Article extends app.Controller {
    async get (ctx) {
      let userName = ctx.query.userName
      if (userName) {
        ctx.body = ctx.orm().article.findAll({where: {userName}})
      } else {
        ctx.body = ctx.orm().article.findAll({})
      }
    }

    async getById (ctx) {
      let id = ctx.query.id
      ctx.body = await ctx.orm().article.findOne({where: { id }})
    }

    async post (ctx) {
      let article = ctx.request.body
      let userName = article.userName
      let result = await ctx.orm().article.create(article)
      if (result) {
        ctx.body = true
        await ctx.orm().draft.destroy({where: {userName}})
      } else {
        ctx.body = false
      }
    }

    async delete (ctx) {
      let id = ctx.query.id
      ctx.body = await ctx.orm().article.destroy({ where: { id } })
    }

    async update (ctx) {
      let article = ctx.request.body
      ctx.body = await ctx.orm().article.update({
        title: article.title, contents: article.contents
      }, {
        where: {
          userName: article.userName,
          id: article.id
        }
      })
    }
  }
}
