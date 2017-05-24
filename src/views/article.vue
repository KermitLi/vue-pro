<template>
  <div class="article" utear-loading-style='bars' v-loading='loading'>
    <md-layout md-gutter class="contents">
      <md-layout md-hide-xsmall md-flex-small='10' md-flex-medium="20" md-flex-large="25" md-flex-xlarge="25">
        <md-button class="md-icon-button" md-size='large' @click.native='back'>
          <md-icon>arrow_back</md-icon>
        </md-button>
      </md-layout>
      <md-layout md-flex-xsmall="100" md-flex-small="80" md-flex-medium="60" md-flex-large="50" md-flex-xlarge="50" class="contents">
        <article>
          <header class="title">
            {{article.title}}
          </header>
          <span class="name">
            <router-link style="display:inline-block" :to='"/articles/"+article.userName'>{{article.userName}}</router-link>
            <span class="time">{{article.time}}</span>
          </span>
  
          <p class="content" v-html="article.content"></p>
        </article>
        <section class="userInfo">
          <router-link :to='"/articles/"+user.name'>
            <md-avatar class="md-large">
              <img :src='user.avatar_url' alt="">
            </md-avatar>
          </router-link>
          <span class="md-subhead signature">{{user.signature}}</span>
        </section>
      </md-layout>
      <md-layout md-hide-xsmall md-flex-small='10' md-flex-medium="20" md-flex-large="25" md-flex-xlarge="25">
      </md-layout>
    </md-layout>
  </div>
</template>
<script>
const jwt = require('koa-jwt');
const moment = require('moment');
moment.lang('zh-cn');
const $ = require('jquery');
const marked = require('marked');
const hljs = require('highlight.js');
import "highlight.js/styles/atom-one-light.css";
var renderer = new marked.Renderer();
renderer.code = function (code, lang) {
  return "<code class='hljs'>" + hljs.highlightAuto(code).value + "</code>";
};
marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true
});
import "gitment/style/default.css";

export default {
  name: "article",
  data() {
    return {
      article: {
        title: '',
        content: '',
        time: '',
        userName: ''
      },
      user: {
        name: '',
        avatar_url: '/photos/logo.jpg',
        signature: '没有个性签名'
      },
      loading: false
    };
  },
  methods: {
    marked,
    back() {
      this.$router.go(-1);
    },
    getArticle(id) {
      this.loading = true;
      this.$http.get('/api/getArticleContent', { params: { id } }).then((res) => {
        this.loading = false;
        if (res.data) {
          this.article.title = res.data.title;
          this.article.content = this.marked(res.data.contents);
          this.article.time = moment(res.data.time, 'YYYY-MM-DD HH:mm:ss').fromNow();
          this.user.name = this.article.userName = res.data.userName;
          this.getUserInfo(this.article.userName);
        }
        else {
          this.$message.error('获取文章内容失败');
        }
      }, () => {
        this.loading = false;
        this.$message.error('服务器错误');
      });
    },
    getUserInfo(userName) {
      let name = userName;
      this.$http.get('/api/userInfo', { params: { name } }).then((res) => {
        let user = res.data;
        if (user) {
          this.user.avatar_url = user.avatar_url;
          this.user.signature = user.signature;
        }
        else {
          this.$message.error('获取用户信息失败');
        }
      }, () => {
        this.$message.error('服务器错误，获取用户信息失败');
      });
    }
  },
  created() {
    let token = sessionStorage.getItem('token');
    if (token !== null && token !== 'null') {
      this.getArticle(this.$route.params.id);
    }
    else {
      this.$router.push({ path: '/login' });
    }
  },
  mounted() {
  }
}
</script>
<style lang="less" scoped>
.article,
.md-layout {
  height: 100%;
  overflow: auto;

  article {
    width: 100%;
    min-height: 68%;
    position: relative;

    header {
      font-size: 1.5rem;
      line-height: 1.5;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .time {
      display: inline-block;
      margin-bottom: 0.4rem;
      margin-left: 0.3rem;
      font-size: 0.5rem;
      color: #BDBDBD;
    }

    .content {
      white-space: pre-wrap;
    }
  }
  .userInfo {
    width: 100%;
    text-align: center;

    .md-avatar {
      width: 2.5rem;
      height: 2.5rem;
      display: inline-block;
    }

    .signature {
      display: inline-block;
      color: #BDBDBD;
      line-height: 2;
    }
  }
}
</style>