/* eslint-disable prefer-promise-reject-errors */
const md5 = require('md5')
const $http = require('axios')
export default {
  $http,
  validate (user) {
    let result = {errorCode: 1, message: ''}
    if (user.name.length === 0) {
      result.message = '用户名不能为空'
    } else if (user.pwd.length === 0) {
      result.message = '密码不能为空'
    } else {
      result.errorCode = 0
    }
    return result
  },
  validateRegister (user) {
    let result = {errorCode: 1, message: ''}
    if (user.userName.trim().length === 0) {
      result.message = '用户名不能为空'
    } else if (user.userEmail.trim().length === 0) {
      result.message = '电子邮箱不能为空'
    } else if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(user.userEmail.trim())) {
      result.message = '非法的电子邮箱'
    } else if (user.userPwd.trim().length === 0) {
      result.message = '密码不能为空'
    } else if (user.userConfirmPwd.trim().length === 0) {
      result.message = '请确认密码'
    } else if (user.userConfirmPwd !== user.userPwd) {
      result.message = '两次密码不一致'
    } else {
      result.errorCode = 0
    }
  },
  checkName (name) {
    return new Promise((resolve, reject) => {
      let result = {errorCode: 0}
      this.$http.get('/api/checkName', {params: {name}}).then(res => {
        if (res.data.errorCode === 1) {
          result.errorCode = 1
          result.message = '用户名已存在'
          reject(result)
        } else {
          resolve(res.data)
        }
      }, () => {
        result.errorCode = 500
        result.message = '服务器错误'
        reject(result)
      })
    })
  },
  login (user) {
    return new Promise((resolve, reject) => {
      let result = this.validate(user)
      if (result.errorCode === 0) {
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
          result.errorCode = 500
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
