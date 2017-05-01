<template>
    <div class="post">
        <ut-row>
            <ut-col :span='4'>
                <md-button class="md-icon-button">
                    <md-icon>arrow_back</md-icon>
                </md-button>
            </ut-col>
            <ut-col :span='16'>
                <ut-input placeholder='请输入标题' class='title' v-model="title"></ut-input>
                <markdown-editor v-model="content" ref="markdownEditor" :configs='configs'></markdown-editor>
            </ut-col>
            <ut-col :span='4' class="clearFix">
                <md-menu md-align-trigger style="float:right" md-size='2'>
                    <md-button class="md-icon-button" style="float:right" md-menu-trigger>
                        <md-icon>more_vert</md-icon>
                    </md-button>
                    <md-menu-content>
                        <md-menu-item>保存草稿</md-menu-item>
                        <md-menu-item @click.native='postArticle'>发表</md-menu-item>
                        <md-menu-item :disabled='clearDisabled' @click.native='clear'>清空内容</md-menu-item>
                    </md-menu-content>
                </md-menu>
            </ut-col>
        </ut-row>
    </div>
</template>
<script lang="">
const jwt = require('koa-jwt');
const moment = require('moment');

export default {
    name: 'post',
    data() {
        return {
            title: '', content: '',
            configs: {
                renderingConfig: {
                    codeSyntaxHighlighting: true, // 开启代码高亮
                    highlightingTheme: 'atom-one-light' // 自定义代码高亮主题，可选列表(https://github.com/isagalaev/highlight.js/tree/master/src/styles)
                }
            }
        }
    },
    computed: {
        clearDisabled() {
            return this.title.length === 0 && this.content.length === 0;
        }
    },
    methods: {
        clear() {
            this.title = '';
            this.content = '';
        },
        validate() {
            if (0 === this.title.length) {
                this.$message.error('标题不能为空');
                return false;
            }
            else if (0 === this.content.length) {
                this.$message.error('内容不能为空');
                return false;
            }
            return true;
        },
        postArticle() {
            if (this.validate()) {
                let title = this.title;
                let contents = this.content;
                let time = moment().format('YYYY.MM.DD');
                let token = sessionStorage.getItem('token');
                if (token !== null && token !== 'null') {
                    var userName = jwt.verify(token, 'Kermit').name;
                }
                else {
                    this.$router.push({ path: '/login' });
                }

                let article = { title, contents, time, userName };
                this.$http.post('/api/postArticle', article).then((res) => {
                    if (res.data) {
                        this.$message.success('发表成功');
                        this.clear();
                    }
                    else {
                        this.$message.error('发表失败');
                    }
                }, () => {
                    this.$message.error('服务器错误');
                });
            }
        }
    }
}
</script>
<style lang="less">
.post,
.utear-row,
.utear-col {
    height: 100%;
}

.post {
    .title {
        margin-top: 2%;
    }
    .title input {
        -webkit-appearance: none;
        outline: none;
        width: 100%;
        font-size: 0.8rem;
    }
    .markdown-editor {
        height: 90%;
        margin-top: 1%;
    }

    .CodeMirror {
        height: 84%;
        overflow: auto;
    }
}
</style>
