/* eslint-disable prefer-promise-reject-errors */
const md5 = require('md5')
const $http = require('axios')
export default {
  $http,
  validate (user) {
    let result = {error_code: 1, message: ''}
    if (user.name.length === 0) {
      result.message = '用户名不能为空'
    } else if (user.pwd.length === 0) {
      result.message = '密码不能为空'
    } else {
      result.error_code = 0
    }
    return result
  },
  login (user) {
    return new Promise((resolve, reject) => {
      let result = this.validate(user)
      if (result.error_code === 0) {
        let userInfo = {
          name: user.name.toLowerCase(),
          pwd: md5(user.pwd)
        }
        this.$http.post('/api/login', userInfo).then(function (res) {
          if (res.data.errorCode === 0) {
            result.data = res.data.data
            result.message = '登录成功'
          } else {
            reject(res.data)
          }
          resolve(result)
        }, function () {
          result.message = '服务器错误'
          result.error_code = 500
          reject(result)
        })
      } else {
        reject(result)
      }
    })
  },
  avatar (name) {
    return new Promise((resolve, reject) => {
      this.$http.get('/api/avatar', { params: { userName: name } }).then(res => {
        if (res.data.errorCode === 0) {
          resolve(res.data.data.url)
        } else {
          reject()
        }
      }, err => {
        reject(err)
      })
    })
  }
}
