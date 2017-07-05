<template>
  <div class="login" utear-loading-style='bars' v-loading='loading'>
    <ut-layout class="layout">
      <ut-row>
        <ut-col :span="2" :offset="11">
          <img class='logo' :src='logoUrl' alt="">
        </ut-col>
      </ut-row>
      <ut-row>
        <ut-col :span="6" :offset="9">
          <ut-input v-model='userName' type='text' class="user-name" size='large' placeholder='Enter Your Name' @blur='check'></ut-input>
          <ut-input v-model='userEmail' type='text' class="user-email" size='large' placeholder='Enter Your Email'></ut-input>
          <ut-input v-model='userPwd' class="user-pwd" placeholder='Enter Your Password' size='large' type='password'></ut-input>
          <ut-input v-model='userConfirmPwd' class="user-confirm-pwd" placeholder='Confirm Your Password' size='large' type='password'></ut-input>
          <ut-button class="register" type="primary" size='large' @click.native='register'>注册</ut-button>
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
export default {
  name: 'register',
  data () {
    return {
      userName: '',
      userEmail: '',
      userPwd: '',
      userConfirmPwd: '',
      logoUrl: '/photos/logo.jpg',
      userNameUnique: true,
      loading: false
    }
  },
  methods: {
    register () {
      this.check().then(() => {
        this.loading = true
        let userInfo = {
          name: this.userName.toLowerCase(),
          email: this.userEmail.toLowerCase(),
          pwd: this.userPwd,
          confirmPwd: this.userConfirmPwd
        }
        this.$store.dispatch('user/register', userInfo).then(result => {
          this.$message.success(result.message)
          this.$router.push({ path: '/login' })
        }, err => {
          this.loading = false
          this.$message.error(err.message)
        })
      })
    },
    check () {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('user/checkName', this.userName).then(() => {
          resolve()
        }, err => {
          this.$message.error(err.message)
          reject()
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
div.login {
  margin-top: 3%;
  .logo {
    max-width: 100%;
    border-radius: 100%;
  }

  .user-pwd,
  .user-name,
  .user-email,
  .user-confirm-pwd,
  .register {
    margin-top: 10%;
  }

  .register {
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
