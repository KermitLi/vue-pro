<template lang="html">
    <div class="login" utear-loading-style='bars' v-loading='loading'>
        <ut-layout class="layout">
            <ut-row>
                <ut-col :span="2" :offset="11"><img class='logo' :src='logoUrl' alt=""></ut-col>
            </ut-row>
            <ut-row>
                    <ut-col :span="6" :offset="9" class='clearFix'>
                        <ut-input v-model:value='userName' type='text' class="user-name" size='large' placeholder='Enter Your Name' @blur='getAvatar'></ut-input>
                        <ut-input v-model:value='userPwd' class="user-pwd" placeholder='Enter Your Password' size='large' type='password'></ut-input>
                        <ut-button class="login" type="primary" size='large' v-on:click.enter.native='login'>登录</ut-button>
                        <router-link to='/forgetPwd' class='forgetPwd'>忘记密码?</router-link>
                    </ut-col>
            </ut-row>
            <ut-row >
                <ut-col :span="6" :offset="9" class='register-con'>
                    <router-link class='register' to='/register'>还没有账户？去注册</router-link>
                </ut-col>
            </ut-row>
        </ut-layout>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: 'login',
  data: function () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters('user', {
      userName: 'name',
      userPwd: 'pwd',
      logoUrl: 'avatar_url',
      token: 'token'
    })
  },
  methods: {
    login: function () {
      this.loading = true
      this.$store.dispatch('login').then(msg => {
        this.loading = false
        this.$message.success(msg)
        sessionStorage.setItem('token', this.token)
      }, err => {
        this.loading = false
        this.$message.error(err)
        sessionStorage('token', null)
      })
    }
  }
}
</script>

<style lang="less" scoped>
div.login {
  margin-top: 5%;
  .logo {
    max-width: 100%;
    border-radius: 100%;
  }

  .user-pwd,
  .user-name {
    margin-top: 10%;
  }

  .login {
    width: 2.5rem!important;
    font-size: 0.5rem!important;
    margin-top: 10%;
    margin-left: 49%;
    transform: translateX(-50%);
  }



  .register-con {
    text-align: center;
    .register {
      display: inline-block;
      margin-top: 10%;
    }
  }

  .forgetPwd {
    display: inline-block;
    float: right;
    text-align: right;
    transform: translateY(-150%);
  }
}
</style>
