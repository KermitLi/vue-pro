module.exports = app => {
  return class User extends app.Controller {
    // 检查用户名是否存在
    async checkName (ctx) {
      let userName = ctx.request.body.name
      console.log(userName)
      if (await ctx.orm().users.findOne({ where: { name: userName } })) {
        ctx.toApiMessage(1, '用户名已存在')
      } else {
        ctx.toApiMessage(0)
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
        ctx.toApiMessage(1, '用户名不存在')
      } else {
        if (result.pwd === userInfo.pwd) {
          let secret = 'Kermit'
          let token = jwt.sign(userInfo, secret)
          let {name, pwd, avatar_url, signature, email} = result
          ctx.toApiMessage(0, {name, pwd, avatar_url, signature, email, token})
        } else {
          ctx.toApiMessage(2, '用户名和密码不匹配')
        }
      }
    }

    // 用户注册
    async register (ctx) {
      let userInfo = ctx.request.body
      if (await ctx.orm().users.create(userInfo)) {
        ctx.toApiMessage(0, '注册成功')
      } else {
        ctx.toApiMessage(1, '注册失败')
      }
    }

    // 重置密码
    async resetPwd (ctx) {
      let { name, pwd, email } = ctx.request.body
      let result = await ctx.orm().users.update({ pwd }, { where: { name, email } })
      if (result[0] > 0) {
        ctx.toApiMessage(0, '重置密码成功')
      } else {
        ctx.toApiMessage(1, '重置密码失败')
      }
    }

    // 更新用户信息
    async update (ctx) {
      let userInfo = ctx.request.body
      let { name, email, avatar_url, signature } = userInfo
      let result = await ctx.orm().users.update({ email, avatar_url, signature }, { where: { name } })
      if (result[0] > 0) {
        ctx.toApiMessage(0, '更新成功')
      } else {
        ctx.toApiMessage(1, '更新失败')
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
        ctx.toApiMessage(0, {url: result.avatar_url})
      } else {
        ctx.toApiMessage(1)
      }
    }
  }
}
