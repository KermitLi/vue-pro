/* eslint-disable prefer-promise-reject-errors */
import * as types from '../mutation-types'

import user from '../../api/user'

export default {
  namespaced: true,
  state: {
    name: '',
    pwd: '',
    avatar_url: '/photos/logo.jpg',
    signature: '您还没有个性签名',
    token: '',
    email: ''
  },
  getters: {
    name: state => state.name,
    pwd: state => state.pwd,
    avatar_url: state => state.avatar_url,
    signature: state => state.signature,
    token: state => state.token,
    email: state => state.email
  },
  mutations: {
    [types.USER_LOGIN] (state, user) {
      state.name = user.name
      state.pwd = user.pwd
      state.avatar_url = user.avatar_url
      state.signature = user.signature
      state.token = user.token
      state.email = user.email
    },
    [types.USER_LOGOUT] (state) {
      state.name = ''
      state.pwd = ''
      state.avatar_url = '/photos/logo.jpg'
      state.signature = '您还没有个性签名'
    }
  },
  actions: {
    login ({commit, state}, userInfo) {
      return new Promise((resolve, reject) => {
        user.login(userInfo).then(result => {
          commit(types.USER_LOGIN, result.data)
          resolve(result.message)
        }, err => {
          reject(err)
        })
      })
    },
    avatar ({commit}, name) {
      return new Promise((resolve, reject) => {
        user.avatar(name).then(url => {
          resolve(url)
        }, (err) => {
          reject(err)
        })
      })
    },
    register (context, userInfo) {
      return new Promise((resolve, reject) => {
        user.register(userInfo).then(result => {
          resolve(result)
        }, err => {
          reject(err)
        })
      })
    },
    checkName (context, name) {
      return new Promise((resolve, reject) => {
        user.checkName(name).then(result => {
          resolve(result)
        }, err => {
          reject(err)
        })
      })
    },
    resetPwd (context, userInfo) {
      return new Promise((resolve, reject) => {
        user.resetPwd(userInfo).then(result => {
          resolve(result)
        }, err => {
          reject(err)
        })
      })
    }
  }
}
