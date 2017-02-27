<template lang="html">
    <div class="login">
        <ut-layout class="layout">
            <ut-row>
                <ut-col :span="2" :offset="11"><img class='logo' :src='logoUrl' alt=""></ut-col>
            </ut-row>
            <ut-row>
                    <ut-col :span="6" :offset="9">
                        <ut-input v-model:value='userName' type='text' class="user-name" size='large' placeholder='Enter Your Name' @blur.native='check'></ut-input>
                        <ut-input v-model:value='userEmail' type='text' class="user-email" size='large' placeholder='Enter Your Email'></ut-input>
                        <ut-input v-model:value='userPwd' class="user-pwd" placeholder='Enter Your Password' size='large' type='password'></ut-input>
                        <ut-input v-model:value='userConfirmPwd' class="user-confirm-pwd" placeholder='Confirm Your Password' size='large' type='password'></ut-input>
                        <ut-button class="register" type="primary" size='large' @click.native='register'>注册</ut-button>
                    </ut-col>
            </ut-row>
        </ut-layout>
    </div>
</template>
<script>
import md5 from 'md5';
export default {
  name:'register',
  data(){
      return {
          userName:'',
          userEmail:'',
          userPwd:'',
          userConfirmPwd:'',
          logoUrl:'/static/img/logo.3456857.jpg'
      }
  },
  methods:{
      validate(){
          return true;
      },
      register(){
          if(this.validate()){
              let userInfo = {
                  name:this.userName,
                  email:md5(this.userEmail),
                  pwd:md5(this.userPwd),
                  logoUrl:this.logoUrl
              }
              this.$http.post('/api/register',userInfo).then((res)=>alert(res.data),(err)=>alert('请求错误'));
          }
      },
      check(){
          this.$http.post('/api/checkName',{name:this.userName}).then((res)=>{
              alert(res.data);
          },(err)=>alert('请求错误'))
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

        .user-pwd,.user-name,.user-email, .user-confirm-pwd,.register {
            margin-top: 7%;
        }

    }

</style>
