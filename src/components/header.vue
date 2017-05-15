<template>
    <div class="navMenu">
        <md-toolbar md-theme="blue" style='color:white'>
            <md-button class="md-icon-button" @click.native="toggleLeftSidenav">
                <md-icon>menu</md-icon>
            </md-button>
        </md-toolbar>
        <md-sidenav class="md-left" ref="leftSidenav">
            <md-toolbar class="md-large" md-primary>
                <md-avatar class="md-avatar-icon md-large">
                    <router-link to='/myProfile'>
                        <img :src='logoUrl' alt="">
                    </router-link>
                </md-avatar>
                <span class="md-subhead">{{signature}}</span>
            </md-toolbar>
    
            <md-list>
                <md-list-item>
                    <router-link to='/'>
                        <md-icon>home</md-icon>
                        <span>首页</span>
                    </router-link>
                </md-list-item>
                <md-list-item>
                    <router-link :to='"/articles/"+userName'>
                        <md-icon>description</md-icon>
                        <span>文章列表</span>
                    </router-link>
                </md-list-item>
                <md-list-item>
                    <router-link to='/albums'>
                        <md-icon>collections</md-icon>
                        <span>相册列表</span>
                    </router-link>
                </md-list-item>
                <md-list-item>
                    <router-link to='/news'>
                        <md-icon>fiber_new</md-icon>
                        <span>技术新闻</span>
                    </router-link>
                </md-list-item>
            </md-list>
            <md-button class="signOut" @click.native='signOut'>
                <md-icon>input</md-icon>
                <span>退出登录</span>
            </md-button>
        </md-sidenav>
    </div>
</template>

<script>
export default {
    name: 'header',
    data() {
        return {
            logoUrl: '/photos/logo.jpg',
            signature: '您还没有个性签名'
        }
    },
    props: ['userName'],
    methods: {
        toggleLeftSidenav() {
            this.$refs.leftSidenav.toggle();
        },
        getUserInfo() {
            let name = this.userName;
            this.$http.get('/api/userInfo', { params: { name } }).then((res) => {
                if (res.data) {
                    this.logoUrl = res.data.avatar_url;
                    this.signature = res.data.signature;
                }
            });
        },
        signOut() {
            sessionStorage.setItem('token', null);
            this.$router.push({ path: '/login' });
        }
    },
    created() {
        this.getUserInfo();
    }
}
</script>

<style lang="less" scoped>
.navMenu {
    background-color: #20a0ff;
    width: 100%;
    height: 8%;

    .md-avatar.md-large.md-large {
        width: 2.3rem;
        height: 2.3rem;
        border-radius: 100%;
    }

    .md-subhead {
        width: 100%;
        display: block;
        text-align: center;
    }

    .md-list-item:hover {
        background-color: #E0E0E0;
    }

    .signOut {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 9%;
        color: #f44336;
        font-size: 0.6rem;
        font-weight: bold;
        letter-spacing: 0.15rem;
    }
}

.title {
    color: white;
    line-height: 2rem;
    font-size: 0.9rem;
    font-weight: bold;
}

.utear-menu {
    background-color: #20a0ff!important;
    .utear-menu-item {
        color: #fff!important;
        font-size: 0.6rem;
    }
    .is-active {
        color: #000!important;
    }
}

.utear-menu,
.utear-submenu,
.utear-submenu__title {
    height: 1.1rem!important;
}
</style>
