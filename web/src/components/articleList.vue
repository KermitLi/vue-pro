<template>
    <div class="articleList" utear-loading-style='bars' v-loading='loading'>
        <md-layout md-gutter class="contents">
            <md-layout md-hide-xsmall md-hide-small md-flex-medium="10" md-flex-large="15" md-flex-xlarge="20">
            </md-layout>
            <md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="80" md-flex-large="70" md-flex-xlarge="60" class="contents">
                <ut-card v-for='(item,index) in articles' :key="index">
                    <div slot="header" class='clearFix'>
                        <router-link :to='"/articles/"+item.userName' class='headPic'>
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
                                <ut-dropdown-item @click.native='deleteArticle(index)'>删除</ut-dropdown-item>
                            </template>
                        </ut-dropdown>
                    </div>
                    <div>
                        <router-link :to='"/article/"+item.id' class="article-title">{{item.title}}</router-link>
                        <article class="article-content" v-html="marked(item.contents)">
                        </article>
                    </div>
                    <router-link :to='"/article/"+item.id' class='readMore'>查看更多</router-link>
                </ut-card>
            </md-layout>
            <md-layout md-hide-xsmall md-hide-small md-flex-medium="10" md-flex-large="15" md-flex-xlarge="20">
            </md-layout>
        </md-layout>
        <router-link to='/article/post'>
            <md-button class="md-fab add">
                <md-icon>edit</md-icon>
            </md-button>
        </router-link>
        <md-dialog-confirm md-title="删除文章" md-content-html="删除后不可恢复，确定删除？" md-ok-text="仍要删除" md-cancel-text="取消" @close="onClose" ref="dialog2">
        </md-dialog-confirm>
    </div>
</template>

<script>
const moment = require('moment');
moment.lang('zh-cn');
const marked = require('marked');
const hljs = require('highlight.js');
import 'highlight.js/styles/atom-one-light.css';
marked.setOptions({
    highlight: function (code, lang) {
        return "<code class='hljs'>" + hljs.highlightAuto(code).value + "</code>";
    }
});
export default {
    data() {
        return {
            articles: [],
            currentArticle: -1,
            loading: false
        }
    },
    props: ['userName'],
    methods: {
        marked, hljs,
        openDialog(ref) {
            this.$refs[ref].open();
        },
        closeDialog(ref) {
            this.$refs[ref].close();
        },
        onClose(type) {
            if ('ok' == type) {
                this.loading = true;
                let article = this.articles[this.currentArticle];
                let id = article.id;
                this.$http.delete('/api/article', { params: { id } }).then((res) => {
                    this.loading = false;
                    if (res.data) {
                        this.articles.splice(this.currentArticle, 1);
                        this.$message.success('删除成功');
                    }
                    else {
                        this.$message.error('删除失败');
                    }
                }, () => {
                    this.loading = false;
                    this.$message.error('服务器错误');
                });
            }
        },
        deleteArticle(index) {
            this.currentArticle = index;
            this.openDialog('dialog2');
        },
        getArticles(userName) {
            if (userName) {
                this.loading = true;
                this.$http.get('/api/article', { params: { userName } }).then((res) => {
                    this.articles = res.data;
                    this.articles.sort((a, b) => {
                        if (moment(a.time, 'YYYY-MM-DD HH:mm:ss').isAfter(b.time)) {
                            return -1;
                        }
                        else {
                            return 1;
                        }
                    });
                    this.articles.forEach((item, id) => {
                        this.getAvatar(item.userName, id);
                        this.$set(this.articles[id], 'time', moment(item.time, 'YYYY-MM-DD HH:mm:ss').fromNow())
                    });
                    this.loading = false;
                }, (err) => {
                    this.loading = false;
                    this.$message.error('获取文章列表失败');
                });
            }
            else {
                this.loading = true;
                this.$http.get('/api/article').then((res) => {
                    this.articles = res.data;
                    this.articles.sort((a, b) => {
                        if (moment(a.time, 'YYYY-MM-DD HH:mm:ss').isAfter(b.time)) {
                            return -1;
                        }
                        else {
                            return 1;
                        }
                    });
                    this.articles.forEach((item, id) => {
                        this.getAvatar(item.userName, id);
                        this.$set(this.articles[id], 'time', moment(item.time, 'YYYY-MM-DD HH:mm:ss').fromNow())
                    });
                    this.loading = false;
                }, (err) => {
                    this.loading = false;
                    this.$message.error('获取文章列表失败');
                });
            }
        },
        getAvatar(userName, id) {
            this.$http.get('/api/avatar', { params: { userName } }).then((res) => {
                if (0 === +res.data.errorCode) {
                    this.$set(this.articles[id], 'logoUrl', res.data.data.url);
                }
            });
        }
    },
    created() {
        if (this.$route.params.userName) {
            this.getArticles(this.$route.params.userName);
        }
        else {
            this.getArticles();
        }
    },
    watch: {
        '$route'(to, from) {
            if (to.path == '/' && from.path == '/articles/' + from.params.userName) {
                this.getArticles();
            }
            else if (to.path == '/articles/' + to.params.userName && from.path == '/') {
                this.getArticles(to.params.userName);
            }
            else if (to.path == '/articles/' + to.params.userName && from.path == '/articles/' + from.params.userName) {
                console.log(to.params.userName);
                this.getArticles(to.params.userName);
            }
        }
    }
}
</script>
<style lang="less" scoped>
.articleList {
    width: 100%;
    height: 92%;
    overflow: auto;

    a:hover {
        text-decoration: none!important;
    }

    .contents {
        height: 100%;

        .md-layout {
            height: 100%;

            .utear-card {
                width: 100%;
                height: 31.4%;
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
                        color: #424242;
                        height: 2.5rem;
                        margin-top: 0.4rem;
                        overflow: hidden;
                        white-space: pre-wrap;
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
