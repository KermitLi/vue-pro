const md5 = require('md5')
const $http = require('vue-resource')
export default {
  $http,
  validate (user) {
    let result = {error_code: 1, msg: ''}
    if (user.name.length === 0) {
      result.msg = '用户名不能为空'
    } else if (user.pwd.length === 0) {
      result.msg = '密码不能为空'
    } else {
      result.error_code = 0
    }
    return result
  },
  async login (user) {
    let result = this.validate(user)
    if (result.error_code === 0) {
      let userInfo = {
        name: user.name.toLowerCase(),
        pwd: md5(user.pwd)
      }
      await this.$http.post('/api/login', userInfo).then(function (res) {
        if (res.data.errorCode === 0) {
          result.data = res.data.data
          result.msg = '登录成功'
          sessionStorage.setItem('token', res.body.data.token)
          this.$router.push({ path: '/' })
        } else if (res.data.errorCode === 1) {
          result.msg = '用户名不存在'
          result.error_code = 1
          sessionStorage.setItem('token', null)
        } else if (res.data.errorCode === 2) {
          result.msg = '用户名和密码不匹配'
          result.error_code = 1
          sessionStorage.setItem('token', null)
        }
      }, function () {
        result.msg = '服务器错误'
        result.error_code = 1
        sessionStorage.setItem('token', null)
      })
    }
    return result
  }
}
