<template>
    <div class="articleList">
        <ut-row class='contents'>
            <ut-col :span='4'></ut-col>
            <ut-col :span='16' style='overflow:auto;'>
                <ut-card v-for='item in articles'>
                    <div slot="header" class='clearFix'>
                        <router-link to='#' class='headPic'>
                            <img :src='item.logoUrl' alt="" class='avatar'>
                        </router-link>
                        <div class="articleInfo">
                            <span class='author'>{{item.userName}}</span>
                            <span class='time'>{{item.time}}</span>
                        </div>
                        <ut-dropdown style="float: right;" v-if='item.userName==userName'>
                            <i class="material-icons edit">mode_edit</i>
                            <template slot='dropdown'>
                                <ut-dropdown-item>
                                    <router-link :to='"/article/edit/"+item.id'>编辑</router-link>
                                </ut-dropdown-item>
                                <ut-dropdown-item>删除</ut-dropdown-item>
                            </template>
                        </ut-dropdown>
                    </div>
                    <div>
                        <router-link to='#' class="article-title">{{item.title}}</router-link>
                        <article class="article-content">
                            {{item.contents}}
                        </article>
                    </div>
                    <router-link to='#' class='readMore'>查看更多</router-link>
                </ut-card>
            </ut-col>
            <ut-col :span='4'></ut-col>
        </ut-row>
        <router-link to='/article/post'>
            <md-button class="md-fab add">
                <md-icon>edit</md-icon>
            </md-button>
        </router-link>
    </div>
</template>
<script lang="">
const jwt = require('koa-jwt');
const moment = require('moment');
export default {
    data(){
        return{
            articles:[],
        }
    },
    props:['userName'],
    methods:{
        getArticles(userName){
            if(userName){
                this.$http.get('/api/getArticle',{params:{userName}}).then((res)=>{
                this.articles = res.data;
                this.articles.forEach((item,id)=>{
                    this.getAvatar(item.userName,id);
                    this.$set(this.articles[id],'time',moment(item.time,'YYYY-MM-DD HH:mm:ss').fromNow())
                });
                this.articles.sort((a,b)=>{
                    if(moment(a.time,'YYYY-MM-DD HH:mm:ss').isAfter(b.time)){
                        return -1;
                    }
                    else{
                        return 1;
                    } 
                });                   
                },(err)=>{
                    this.$message.error('获取文章列表失败');
                });
            }
            else{
                this.$http.get('/api/getArticle').then((res)=>{
                this.articles = res.data; 
                this.articles.forEach((item,id)=>{
                    this.getAvatar(item.userName,id);
                    this.$set(this.articles[id],'time',moment(item.time,'YYYY-MM-DD HH:mm:ss').fromNow())
                }); 
                this.articles.sort((a,b)=>{
                    if(moment(a.time,'YYYY-MM-DD HH:mm:ss').isAfter(b.time)){
                        return -1;
                    }
                    else{
                        return 1;
                    } 
                });                 
                },(err)=>{
                    this.$message.error('获取文章列表失败');
                });
            }
        },
        getAvatar(userName,id){
            this.$http.get('/api/avatar', { params:{userName} }).then((res) => {
                    if (res.data.state) {
                        this.$set(this.articles[id],'logoUrl',res.data.url);
                    }
                });
        }
    },
    created(){
        if(this.$route.params.userName){
            this.getArticles(this.userName);
        }
        else{
            this.getArticles();
        }
    },
    watch: {
        '$route' (to, from) {
            if(to.path=='/'&&from.path=='/articles/'+this.userName){
                this.getArticles();
            }
            else if(to.path=='/articles/'+this.userName&&from.path=='/'){
                this.getArticles(this.userName);
            }
        }
    }
}
</script>
<style lang="less" scoped>
.articleList {
    width: 100%;
    height: 90%;
    border: 1px solid #000;

    a:hover {
        text-decoration: none!important;
    }

    .contents {
        height: 100%;

        .utear-col {
            height: 100%;

            .utear-card {
                margin-top: 1rem; // border:none;
                .utear-card-header {
                    .headPic {
                        float: left;
                    }

                    .articleInfo {
                        display: inline-block;
                        float: left;
                        margin-left: 0.6rem;

                        .author {
                            display: block;
                            color: #212121;
                            font-weight: 600;
                            font-size: 0.5rem;
                            text-align: left;
                        }

                        .time {
                            display: block;
                            margin-top: 0.3rem;
                            font-size: 0.45rem;
                            color: #BDBDBD;
                        }
                    }

                    .edit {
                        cursor: pointer;
                    }
                }

                .utear-card-body {
                    .article-title {
                        font-size: 0.7rem;
                        line-height: 1.3;
                        color: #03A9F4;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    .article-title:hover {
                        color: #0288D1;
                    }

                    .article-content {
                        font-size: 0.6rem;
                        line-height: 1.4;
                        word-break: break-all;
                        color: #424242;
                        height: 2.5rem;
                        margin-top: 0.4rem;
                        overflow: hidden;
                    }
                }

                .readMore {
                    font-size: 0.45rem;
                    color: #4FC3F7;
                    position: absolute;
                    right: 1rem;
                    bottom: 0.1rem;
                }

                .readMore:hover {
                    color: #29B6F6;
                }
            }
        }
    }

    .add {
        position: fixed;
        bottom: 7%;
        left: 50%;
        transform: translateX(-50%);
    }
}
</style>
