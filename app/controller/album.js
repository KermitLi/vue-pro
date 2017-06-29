module.exports = app => {
  return class Album extends app.Controller {
    async create (ctx) {
      let album = ctx.request.body
      let query = await ctx.orm().albums.findOne({where: {userName: album.userName, name: album.name}})
      if (query) {
        ctx.toApiMessage(2, '相册已存在')
      } else {
        if (await ctx.orm().albums.create(album)) {
          ctx.toApiMessage(0)
        } else {
          ctx.toApiMessage(1, '创建失败')
        }
      }
    }

    async get (ctx) {
      ctx.body = await ctx.orm().albums.findAll({where: ctx.query})
    }

    async delete (ctx) {
      ctx.body = await ctx.orm().albums.destroy({where: ctx.query})
    }

    async update (ctx) {
      let album = ctx.request.body
      let query = ctx.orm().albums.findOne({where: {userName: album.userName, name: album.name}})
      if (query) {
        ctx.toApiMessage(2, '相册已存在')
      } else {
        if (await ctx.orm().albums.update({name: album.name, desc: album.desc}, {where: {userName: album.userName, name: album.oldName, desc: album.oldDesc}})) {
          ctx.toApiMessage(0)
        } else {
          ctx.toApiMessage(1, '更新失败')
        }
      }
    }
  }
}
