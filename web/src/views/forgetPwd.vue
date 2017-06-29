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
import md5 from 'md5';
export default {
  name: "forgetPwd",
  data() {
    return {
      logoUrl: '/photos/logo.jpg',
      userName: '',
      userEmail: '',
      userPwd: '',
      confirmPwd: '',
      userNameUnique: false,
      loading: false
    };
  },
  methods: {
    validate() {
      if (0 === this.userName.length) {
        this.$message.error('用户名不能为空');
        return false;
      }
      else if (0 === this.userEmail.length) {
        this.$message.error('电子邮箱不能为空');
        return false;
      }
      else if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.userEmail)) {
        this.$message.error('非法的电子邮箱');
        return false;
      }
      else if (0 === this.userPwd.length) {
        this.$message.error('密码不能为空');
        return false;
      }
      else if (0 === this.confirmPwd.length) {
        this.$message.error('请确认密码');
        return false;
      }
      else if (this.confirmPwd !== this.userPwd) {
        this.$message.error('两次密码不一致');
        return false;
      }
      else {
        return true;
      }
    },
    updatePwd() {
      if (this.validate() && this.userNameUnique) {
        this.loading = true;
        let userEmail = md5(this.userEmailtoLowerCase());
        let userNewPwd = md5(this.userPwd);
        let userName = this.userName.toLowerCase();
        this.$http.post('/api/resetPwd', { pwd: userNewPwd, email: userEmail, name: userName }).then((res) => {
          if (res.data) {
            this.$message.success("重置密码成功");
            setTimeout(() => {
              this.$router.push({ path: '/login' });
            }, 1000);
          }
          else {
            this.$message.error("用户名和电子邮箱不一致");
          }
        }, (err) => { this.loading = false; this.$message.error('请求错误'); });
      }
    },
    check() {
      this.$http.post('/api/checkName', { name: this.userName }).then((res) => {
        if (!res.data) {
          this.userNameUnique = true;
        }
        else {
          this.$message.error('用户名不存在');
        }
      }, (err) => this.$message.error('请求错误'));
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