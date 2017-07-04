import * as types from '../mutation-types'

import user from '../../api/user'

export default {
  namespaced: true,
  state: {
    name: '',
    pwd: '',
    avatar_url: '/photos/logo.jpg',
    signature: '您还没有个性签名',
    token: ''
  },
  getters: {
    name: state => state.name,
    pwd: state => state.pwd,
    avatar_url: state => state.avatar_url,
    signature: state => state.signature,
    token: state => state.token
  },
  mutations: {
    [types.USER_LOGIN] (state, user) {
      state.name = user.name
      state.pwd = user.pwd
      state.avatar_url = user.avatar_url
      state.signature = user.signature
      state.token = user.token
    },
    [types.USER_LOGOUT] (state) {
      state.name = ''
      state.pwd = ''
      state.avatar_url = '/photos/logo.jpg'
      state.signature = '您还没有个性签名'
    }
  },
  actions: {
    login ({state, commit}) {
      return new Promise((resolve, reject) => {
        let result = user.login(state)
        if (result.error_code === 0) {
          commit([types.USER_LOGIN], result.data)
          resolve(result.msg)
        } else {
          reject(result.msg)
        }
      })
    }
  }
}
