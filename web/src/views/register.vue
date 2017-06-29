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
                    <ut-input v-model:value='userName' type='text' class="user-name" size='large' placeholder='Enter Your Name' @blur='check'></ut-input>
                    <ut-input v-model:value='userEmail' type='text' class="user-email" size='large' placeholder='Enter Your Email'></ut-input>
                    <ut-input v-model:value='userPwd' class="user-pwd" placeholder='Enter Your Password' size='large' type='password'></ut-input>
                    <ut-input v-model:value='userConfirmPwd' class="user-confirm-pwd" placeholder='Confirm Your Password' size='large' type='password'></ut-input>
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
import md5 from 'md5';
export default {
    name: 'register',
    data() {
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
        validate() {
            if (0 === this.userName.trim().length) {
                this.$message.error('用户名不能为空');
                return false;
            }
            else if (0 === this.userEmail.trim().length) {
                this.$message.error('电子邮箱不能为空');
                return false;
            }
            else if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.userEmail.trim())) {
                this.$message.error('非法的电子邮箱');
                return false;
            }
            else if (0 === this.userPwd.trim().length) {
                this.$message.error('密码不能为空');
                return false;
            }
            else if (0 === this.userConfirmPwd.trim().length) {
                this.$message.error('请确认密码');
                return false;
            }
            else if (this.userConfirmPwd !== this.userPwd) {
                this.$message.error('两次密码不一致');
                return false;
            }
            else {
                return true;
            }
        },
        register() {
            this.check();
            if (this.validate() && this.userNameUnique) {
                this.loading = true;
                let userInfo = {
                    name: this.userName.toLowerCase(),
                    email: this.userEmail.toLowerCase(),
                    pwd: md5(this.userPwd),
                    logoUrl: this.logoUrl
                }
                this.$http.post('/api/register', userInfo).then((res) => {
                    this.loading = false;
                    if (res.data) {
                        this.$message.success("注册成功");
                        setTimeout(() => {
                            this.$router.push({ path: '/login' });
                        }, 1000);
                    }
                    else {
                        this.$message.error("注册失败");
                    }
                }, (err) => { this.loading = false; this.$message.error('请求错误'); });
            }
        },
        check() {
            this.$http.post('/api/checkName', { name: this.userName }).then((res) => {
                if (!res.data) {
                    this.$message.error('用户名已存在');
                    this.userNameUnique = false;
                }
            }, (err) => { this.loading = false; this.$message.error('请求错误'); })
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
