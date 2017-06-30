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
import md5 from 'md5';
export default {
    name: 'login',
    data: function () {
        return {
            userName: '',
            userPwd: '',
            logoUrl: '/photos/logo.jpg',
            loading: false
        }
    },
    methods: {
        validate: function () {
            if (0 === this.userName.length) {
                this.$message.error('用户名不能为空');
                return false;
            }
            else if (0 === this.userPwd.length) {
                this.$message.error('密码不能为空');
                return false;
            }
            else {
                return true;
            }
        },
        login: function () {
            if (this.validate()) {
                this.loading = true;
                let userInfo = {
                    name: this.userName.toLowerCase(),
                    pwd: md5(this.userPwd)
                }
                this.$http.post('/api/login', userInfo).then(function (res) {
                    this.loading = false;
                    if (0 === +res.body.errorCode) {
                        sessionStorage.setItem('token', res.body.data.token);
                        this.$message.success('登录成功')
                        setTimeout(() => {
                            this.$router.push({ path: '/' });
                        }, 1000);
                    }
                    else if (1 === +res.body.errorCode) {
                        sessionStorage.setItem('token', null);
                        this.$message.error('用户名不存在')
                    }
                    else if (2 === +res.body.errorCode) {
                        sessionStorage.setItem('token', null);
                        this.$message.error('用户名和密码不匹配')
                    }
                }, function (err) {
                    this.loading = false;
                    sessionStorage.setItem('token', null);
                    this.$message.error('服务器错误');
                });
            }
        },
        getAvatar() {
            if (0 < this.userName.length) {
                let userName = this.userName;
                this.$http.get('/api/avatar', { params: { userName } }).then((res) => {
                    if (res.data.state) {
                        this.logoUrl = res.data.url;
                    }
                });
            }
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
