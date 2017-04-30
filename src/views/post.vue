<template>
    <div class="post">
        <ut-row>
            <ut-col :span='4'>
                <md-button class="md-icon-button">
                    <md-icon>arrow_back</md-icon>
                </md-button>
            </ut-col>
            <ut-col :span='16'>
                <ut-input placeholder='请输入标题' class='title'></ut-input>
                <markdown-editor v-model="content" ref="markdownEditor" :configs='configs'></markdown-editor>
            </ut-col>
            <ut-col :span='4'></ut-col>
        </ut-row>
    </div>
</template>
<script lang="">
const jwt = require('koa-jwt');

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
    },
    methods: {
        validate() {
            return true;
        },
        postArticle() {
            if (this.validate()) {
                let title = this.title;
                let content = this.content;
                let time = monment().fromNow();
                let token = sessionStorage.getItem('token');
                if (token !== null && token !== 'null') {
                    var userName = jwt.verify(token, 'Kermit').name;
                }
                else {
                    this.$router.push({ path: '/login' });
                }

                let article = { title, contents, time, userName };
                this.$http.post('/api/postArticle', article).then((res) => alert(res.data));
            }
        }
    }
}
</script>
<style lang="less" scoped>
.title {
    border: none;
    outline: none;
    width: 100%;
    height: 10%;
}


.post,
.utear-row,
.utear-col {
    height: 100%;
}

.markdown-editor {
    height: 90%;
}
</style>
