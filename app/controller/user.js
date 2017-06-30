module.exports = app => {
  return class User extends app.Controller {

    // 检查用户名是否存在
    async checkName (ctx) {
      let userName = ctx.request.body.name
      if (await ctx.orm().users.findOne({ where: { name: userName } })) {
        ctx.toApiMessage(0)
      } else {
        ctx.toApiMessage(1)
      }
    }

    // 用户登录
    async login (ctx) {
      const jwt = require('koa-jwt')
      let userInfo = ctx.request.body
      let result = await ctx.orm().users.findOne({
        where: {
          name: userInfo.name
        }
      })
      if (result === null) {
        ctx.toApiMessage(1)
      } else {
        if (result.pwd === userInfo.pwd) {
          let secret = 'Kermit'
          let token = jwt.sign(userInfo, secret)
          ctx.toApiMessage(0, { token })
        } else {
          ctx.toApiMessage(2)
        }
      }
    }

    async register (ctx) {
      let userInfo = ctx.request.body
      if (await ctx.orm().users.create(userInfo)) {
        ctx.toApiMessage(0)
      } else {
        ctx.toApiMessage(1)
      }
    }

    async resetPwd (ctx) {
      let { name, pwd: newPwd, email } = ctx.request.body
      if (await ctx.orm().users.update({ pwd: newPwd }, { where: { name, email } })) {
        ctx.toApiMessage(0)
      } else {
        ctx.toApiMessage(1)
      }
    }

    async update (ctx) {
      let userInfo = ctx.request.body
      let { name, email, avatar_url, signature } = userInfo
      if (await ctx.orm().users.update({ email, avatar_url, signature }, { where: { name } })) {
        ctx.toApiMessage(0)
      } else {
        ctx.toApiMessage(1)
      }
    }

    // 获取用户信息
    async get (ctx) {
      let name = ctx.query.name
      ctx.body = await ctx.orm().users.findOne({where: {name}})
    }

    // 获取用户头像
    async avatar (ctx) {
      let userName = ctx.query.userName
      let result = await ctx.orm().users.findOne({ where: { name: userName } })
      if (result) {
        ctx.body = {state: true, url: result.avatar_url}
      } else {
        ctx.body = {state: false}
      }
    }
  }
}
