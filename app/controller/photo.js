module.exports = app => {
  return class Photo extends app.Controller {
    // 获取相册图片
    async get (ctx) {
      let {userName, album} = ctx.query
      ctx.body = await ctx.orm().photos.findAll({where: {userName, album}})
    }

    async upload (ctx) {
      const parse = require('co-busboy')
      const path = require('path')
      const fs = require('fs')
      const moment = require('moment')
      const md5 = require('md5')

      let parts = parse(ctx, {autoFields: true})
      let part
      /* eslint-disable no-unmodified-loop-condition */
      console.log(parts.filename)
      while ((part = await parts)) {
        let extname = path.extname(part.filename)
        var filename = md5(moment().format('YYYYMMDDHHmmss') + part.filename) + extname
        let uploadpath = path.join(__dirname, '../public/photos' + filename)
        let stream = fs.createWriteStream(uploadpath)
        console.log('uploading %s -> %s', part.filename, stream.path)
        part.pipe(stream)
      }

      ctx.toApiMessage(0, {url: '/photos/' + filename})
    }

    async save (ctx) {
      let photo = ctx.request.body
      let result = await ctx.orm().photos.create(photo)
      if (result) {
        ctx.toApiMessage(0, {result})
      } else {
        ctx.toApimessage(1, '上传失败')
      }
    }

    // 删除图片
    async delete (ctx) {
      let deleteItems = await ctx.orm().photos.findAll({where: ctx.query})
      if (deleteItems.length === 0) {
        ctx.toApiMessage(0)
      } else {
        ctx.body = await ctx.orm().photos.destroy({ where: ctx.query })
        deleteItems.forEach((item) => {
          require('fs').unlink(require('path').join(__dirname, '../public', item.url))
        })
      }
    }
  }
}
