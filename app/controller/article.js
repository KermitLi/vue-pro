module.exports = app => {
  return class Article extends app.Controller {
    // 获取个人或全部文章列表
    async get (ctx) {
      let userName = ctx.query.userName
      if (userName) {
        ctx.body = await ctx.orm().article.findAll({where: {userName}})
      } else {
        ctx.body = await ctx.orm().article.findAll({})
      }
    }

    // 获取单个文章的内容
    async getById (ctx) {
      let id = ctx.query.id
      ctx.body = await ctx.orm().article.findOne({where: { id }})
    }

    // 发表文章
    async post (ctx) {
      let article = ctx.request.body
      let userName = article.userName
      let result = await ctx.orm().article.create(article)
      if (result) {
        ctx.toApiMessage(0)
        await ctx.orm().draft.destroy({where: {userName}})
      } else {
        ctx.toApiMessage(1)
      }
    }

    // 删除文章
    async delete (ctx) {
      let id = ctx.query.id
      ctx.body = await ctx.orm().article.destroy({ where: { id } })
    }

    // 更新文章内容
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
