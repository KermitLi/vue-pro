module.exports = app => {
  return class Album extends app.Controller {
    // 创建相册
    async create (ctx) {
      let album = ctx.request.body
      let query = await ctx.orm().albums.findOne({where: {userName: album.userName, name: album.name}})
      if (query) {
        ctx.toApiMessage(2, '相册已存在')
      } else {
        let result = await ctx.orm().albums.create(album)
        if (result) {
          ctx.toApiMessage(0, {result})
        } else {
          ctx.toApiMessage(1, '创建失败')
        }
      }
    }

    // 获取相册列表
    async get (ctx) {
      ctx.body = await ctx.orm().albums.findAll({where: ctx.query})
    }

    // 删除相册
    async delete (ctx) {
      ctx.body = await ctx.orm().albums.destroy({where: ctx.query})
    }

    // 更新相册信息
    async update (ctx) {
      let album = ctx.request.body
      let query = await ctx.orm().albums.findAll({where: {userName: album.userName, name: album.name}})
      if (query.length) {
        ctx.toApiMessage(2, '相册已存在')
      } else {
        if ((await ctx.orm().albums.update({name: album.name, desc: album.desc}, {where: {userName: album.userName, name: album.oldName, desc: album.oldDesc}}))[0]) {
          ctx.toApiMessage(0)
        } else {
          ctx.toApiMessage(1, '更新失败')
        }
      }
    }
  }
}
