<template>
  <div class="forgetPwd" utear-loading-style='bars' v-loading='loading'>
    <ut-layout class="layout">
      <ut-row>
        <ut-col :span="2" :offset="11">
          <img class='logo' :src='logoUrl' alt="">
        </ut-col>
      </ut-row>
      <ut-row>
        <ut-col :span="6" :offset="9" class='clearFix'>
          <ut-input v-model='userName' class="user-name" type='text' size='large' placeholder='Enter Your Name' @blur='check'></ut-input>
          <ut-input v-model='userEmail' class="user-email" type='text' size='large' placeholder='Enter Your Email'></ut-input>
          <ut-input v-model='userPwd' class="user-pwd" placeholder='Enter Your New Password' size='large' type='password'></ut-input>
          <ut-input v-model='confirmPwd' class="user-confirm-pwd" placeholder='Confirm Your New Password' size='large' type='password'></ut-input>
          <ut-button class="updatePwd" type="primary" size='large' v-on:click.enter.native='updatePwd'>重置密码</ut-button>
        </ut-col>
      </ut-row>
      <ut-row>
        <ut-col :span="6" :offset="9" class='login-con'>
          <router-link class='login' to='/login'>已有账户？去登录</router-link>
        </ut-col>
      </ut-row>
    </ut-layout>
  </div>
</template>
<script>
/* eslint-disable prefer-promise-reject-errors */
export default {
  name: 'forgetPwd',
  data () {
    return {
      logoUrl: '/photos/logo.jpg',
      userName: '',
      userEmail: '',
      userPwd: '',
      confirmPwd: '',
      userNameUnique: false,
      loading: false
    }
  },
  methods: {
    updatePwd () {
      this.loading = true
      this.check().then(() => {
        this.loading = true
        let { userName: name, userPwd: pwd, userEmail: email, confirmPwd } = this
        this.$store.dispatch('user/resetPwd', {name: name.toLowerCase(), pwd, confirmPwd, email: email.toLowerCase()}).then(result => {
          this.loading = false
          this.$message.success(result.message)
          this.$router.push({path: '/login'})
        }, err => {
          this.loading = false
          this.$message.error(err.message)
        })
      }, () => {
        this.loading = false
      })
    },
    check () {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('user/checkName', this.userName).then(() => {
          this.$message.error('用户不存在')
          reject()
        }, err => {
          if (err.errorCode === 1) {
            resolve()
          } else {
            this.$message.error('服务器错误')
            reject()
          }
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
div.forgetPwd {
  margin-top: 3%;
  .logo {
    max-width: 100%;
    border-radius: 100%;
  }
  .user-name,
  .user-pwd,
  .user-email,
  .user-confirm-pwd,
  .updatePwd {
    margin-top: 10%;
  }

  .updatePwd {
    margin-left: 50%;
    transform: translateX(-50%);
  }

  .login-con {
    text-align: center;
    .login {
      display: inline-block;
      margin-top: 10%;
    }
  }
}
</style>