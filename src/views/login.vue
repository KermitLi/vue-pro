<template lang="html">
    <div class="login">
        <ut-layout class="layout">
            <ut-row>
                <ut-col :span="2" :offset="11"><img class='logo' :src='logoUrl' alt=""></ut-col>
            </ut-row>
            <ut-row>
                    <ut-col :span="6" :offset="9">
                        <ut-input v-model:value='userName' type='text' class="user-name" size='large' placeholder='Enter Your Name'></ut-input>
                        <ut-input v-model:value='userPwd' class="user-pwd" placeholder='Enter Your Password' size='large' type='password'></ut-input>
                        <ut-button class="login" type="primary" size='large' @click.native='login'>登录</ut-button>
                        <router-link to='/forgetPwd'>忘记密码？</router-link>
                    </ut-col>
            </ut-row>
            <ut-row>
                <ut-col :span="6" :offset="9">
                    <router-link class='register' to='/register'>还没有账户？去注册</router-link>
                </ut-col>
            </ut-row>
        </ut-layout>
    </div>
</template>
<script>
import md5 from 'md5';
export default {
  name:'login',
  data:function(){
      return {
          userName:'',
          userPwd:'',
          logoUrl:'/static/img/logo.3456857.jpg'
      }
  },
  methods:{
      validate:function(){
          return true;
      },
      login:function(){
          if(this.validate()){
              let userInfo = {
                  name:this.userName,
                  pwd:md5(this.userPwd)
              }
              this.$http.post('/api/login',userInfo).then(function(res){
                  if(res.data.state){
                      sessionStorage.setItem('token',res.data.token);
                      console.log(res.data.token);
                      alert('登录成功');
                      this.$router.push({path:'/'});
                  }
                  else {
                      sessionStorage.setItem('token',null);
                      alert(res.data.message);
                  }
              },function(err){
                  sessionStorage.setItem('token',null);
              });
          }
      }
  }
}
</script>

<style lang="less" scoped>
    div.login {
        margin-top: 10%;
        .logo   {
            max-width: 100%;
            border-radius: 100%;
        }

        .user-pwd,.user-name {
            margin-top: 7%;
        }

        .login {
            width: 2.5rem!important;
            font-size: 0.5rem!important;
            margin-top: 7%;
            margin-left: 35%;
            transform: translateX(-50%);
        }

        .register {
            display: inline-block;
            margin-top: 5%;
        }

    }

</style>
