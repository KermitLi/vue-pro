<template>
    <div class="post">
        <ut-row>
            <ut-col :span='4'>
                <md-button class="md-icon-button" md-size='large' @click.native='back'>
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
                    <md-menu-content v-if='type=="post"'>
                        <md-menu-item @click.native='saveDraft'>保存草稿</md-menu-item>
                        <md-menu-item @click.native='postArticle'>发表</md-menu-item>
                        <md-menu-item :disabled='clearDisabled' @click.native='clear'>清空内容</md-menu-item>
                    </md-menu-content>
                    <md-menu-content v-else>
                        <md-menu-item @click.native='updateArticle'>保存更改</md-menu-item>
                    </md-menu-content>
                </md-menu>
            </ut-col>
        </ut-row>
    </div>
</template>
<script>
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
            },
            type: 'post'
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
                let time = moment().format('YYYY-MM-DD HH:mm:ss');
                let token = sessionStorage.getItem('token');
                if (token !== null && token !== 'null') {
                    var userName = jwt.verify(token, 'Kermit').name;
                }
                else {
                    this.$router.push({ path: '/login' });
                }

                let article = { title, contents, userName, time };
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
        },
        getArticle(id) {
            let token = sessionStorage.getItem('token');
            var userName = jwt.verify(token, 'Kermit').name;
            if (token !== null && token !== 'null') {
                this.$http.get('/api/getArticleContent', { params: { id } }).then((res) => {
                    if (res.data) {
                        this.title = res.data.title;
                        this.content = res.data.contents;
                    }
                    else {
                        this.$message.error('获取文章内容失败');
                    }
                }, () => {
                    this.$message.error('服务器错误');
                });
            }
            else {
                this.$router.push({ path: '/login' });
            }
        },
        updateArticle() {
            if (this.validate()) {
                let title = this.title;
                let contents = this.content;
                let id = this.$route.params.id;
                let token = sessionStorage.getItem('token');
                if (token !== null && token !== 'null') {
                    var userName = jwt.verify(token, 'Kermit').name;
                }
                else {
                    this.$router.push({ path: '/login' });
                }

                let article = { title, contents, userName, id };
                this.$http.post('/api/updateArticle', article, ).then((res) => {
                    if (res.data) {
                        this.$message.success('更改成功');
                        this.$router.go(-1);
                    }
                    else {
                        this.$message.error('更改失败');
                    }
                }, () => {
                    this.$message.error('服务器错误');
                });
            }
        },
        saveDraft() {
            if (this.validate()) {
                let title = this.title;
                let contents = this.content;
                let token = sessionStorage.getItem('token');
                if (token !== null && token !== 'null') {
                    var userName = jwt.verify(token, 'Kermit').name;
                }
                else {
                    this.$router.push({ path: '/login' });
                }

                let draft = { title, contents, userName };
                this.$http.post('/api/saveDraft', draft).then((res) => {
                    if (res.data) {
                        this.$message.success('保存成功');
                    }
                    else {
                        this.$message.error('保存失败');
                    }
                }, () => {
                    this.$message.error('服务器错误');
                });

            }
        },
        getDraft() {
            let token = sessionStorage.getItem('token');
            var userName = jwt.verify(token, 'Kermit').name;
            if (token !== null && token !== 'null') {
                this.$http.get('/api/getDraft', { params: { userName } }).then((res) => {
                    if (res.data) {
                        this.title = res.data.title;
                        this.content = res.data.contents;
                    }
                }, () => {
                    this.$message.error('获取草稿失败');
                });
            }
            else {
                this.$router.push({ path: '/login' });
            }
        }
    },
    created() {
        if (this.$route.params.id) {
            this.type = 'edit';
            this.getArticle(this.$route.params.id);
        }
        else {
            this.getDraft();
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
