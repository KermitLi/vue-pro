<template>
    <div class="news">
        <navMenu :userName='userName'></navMenu>
        <md-layout md-gutter class="contents" utear-loading-style='bars' v-loading='loading'>
            <md-layout md-hide-xsmall md-hide-small md-flex-medium="10" md-flex-large="15" md-flex-xlarge="20">
                <md-button class="md-icon-button" md-size='large' @click.native='back'>
                    <md-icon>arrow_back</md-icon>
                </md-button>
            </md-layout>
            <md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="80" md-flex-large="70" md-flex-xlarge="60">
                <ut-card v-for='(item,index) in articles'>
                    <div slot="header" class='clearFix'>
                        <span class='createdAt'>{{item.createdAt}}</span>
                        <span class="tags">
                            <router-link :to="'/news?tag='+tag" v-for='tag in item.tagsTitleArray'>
                                <md-chip>{{tag}}</md-chip>
                            </router-link>
                        </span>
                    </div>
                    <div>
                        <a :href='item.url' target='_blank' class="article-title">{{item.title}}</a>
                        <p class="article-content">{{item.content}}</p>
                    </div>
                </ut-card>
                <md-spinner md-indeterminate :md-size='35' class="progress"></md-spinner>
            </md-layout>
            <md-layout md-hide-xsmall md-hide-small md-flex-medium="10" md-flex-large="15" md-flex-xlarge="20">
            </md-layout>
        </md-layout>
    </div>
</template>

<script>
import navMenu from '../components/header.vue';
const jwt = require('koa-jwt');
const $ = require('jquery');
const moment = require('moment');
moment.locale('zh-cn');

export default {
    data() {
        return {
            articles: [],
            currentTag: null,
            page: 1,
            userName: '',
            loading: false
        }
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        getArticles(tag) {
            this.loading = true;
            if (tag != this.currentTag) {
                this.page = 1;
            }
            this.currentTag = tag;
            this.$http.get('/api/news', { params: { tag } }).then((res) => {
                this.loading = false;
                this.articles = res.data;
                this.articles.forEach((item, id) => {
                    this.$set(this.articles[id], 'createdAt', moment(item.createdAt, 'YYYY-MM-DD HH:mm:ss').add(8, "h").fromNow())
                });
            }, (err) => {
                this.loading = false;
                this.$message.error('获取文章列表失败');
            });
        },
        more(tag) {
            if (tag != this.currentTag) {
                this.page = 1;
            }
            this.currentTag = tag;
            var page = this.page;
            this.$http.get('/api/news', { params: { tag, page } }).then((res) => {
                this.articles.push(...res.data);
                res.data.forEach((item, id) => {
                    this.$set(this.articles[id + this.page * 10], 'createdAt', moment(item.createdAt, 'YYYY-MM-DD HH:mm:ss').add(8, "h").fromNow())
                });
                this.page++;
            }, (err) => {
                this.$message.error('获取文章列表失败');
            });
        }
    },
    created() {
        let token = sessionStorage.getItem('token');
        if (token !== null && token !== 'null') {
            this.userName = jwt.verify(token, 'Kermit').name;
            this.getArticles(this.$route.query.tag);
        }
        else {
            this.$router.push({ path: '/login' });
        }
    },
    watch: {
        "$route"(to, from) {
            this.getArticles(to.query.tag);
        }
    },
    updated() {
        var vm = this;
        $('.news').scroll(function () {
            if ($('.progress').offset().top < window.innerHeight) {
                vm.more(vm.$route.query.tag);
                $('.news').off();
            }
        });
    },
    components: {
        navMenu
    }
}
</script>
<style lang="less" scoped>
.news {
    width: 100%;
    height: 100%;
    overflow: auto;

    a:hover {
        text-decoration: none!important;
    }

    .contents {
        height: 92%;

        .md-layout {
            height: 100%;
            position: relative;

            .utear-card {
                width: 100%;
                height: 31.4%;
                margin-top: 1rem; // border:none;
                .utear-card-header {
                    .headPic {
                        float: left;
                    }


                    .createdAt {
                        display: inline-block;
                        margin-top: 0.3rem;
                        margin-right: 0.6rem;
                        font-size: 0.45rem;
                    }


                    .tags {
                        display: inline-block;
                        a {
                            display: inline-block;
                        }
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
            }

            .progress {
                margin-left: 50%;
                transform: translateX(-50%);
                margin-top: 0.15rem;
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
