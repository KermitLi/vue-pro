<template lang="html">
    <div class="post">
        <ut-row>
            <ut-col :span='8' class="preview">
                    <h4>{{title}}</h4>
                    <p class="pre-contents" v-html='marked(contents)'></p>

            </ut-col>
            <ut-col :span='10' :offset='offset'>
                <ut-row>
                    <ut-col :span='24'>
                        <input type="text" class="title" v-model:value='title' placeholder='请输入标题'>
                        <textarea name="name" id='contents' v-model:value='contents' placeholder='请输入内容'></textarea>
                    </ut-col>
                </ut-row>
                <ut-row>
                    <ut-col :span='24'>
                        <ut-button type='primary' size='large' @click.native='postArticle'>发表</ut-button>
                    </ut-col>
                </ut-row>
            </ut-col>
            <ut-col :span='2' :offset='4'>
                <ut-nav>
                    <ut-nav-sub title="保存" index='1'>
                        <ut-nav-item index='1-1'>清空</ut-nav-item>
                        <ut-nav-item index='1-1'>删除</ut-nav-item>
                    </ut-nav-sub>
                </ut-nav>
            </ut-col>
        </ut-row>
    </div>
</template>
<script lang="">
const jwt = require('koa-jwt');
const marked = require('marked');
const monment = require('moment');

    export default {
        name:'post',
        data(){
            return {
                title:'',contents:''
            }
        },
        computed:{
            offset:function(){
                if(this.title.trim().length==0&&this.contents.trim().length==0){
                    return 8;
                }
                else {
                    return 0;
                }
            }
        },
        methods:{
            marked,validate(){
                return true
            },
            postArticle(){
                if(this.validate()){
                    let title = this.title;
                    let contents = this.contents;
                    let time = monment().fromNow();
                    let token = sessionStorage.getItem('token');
                    if(token!==null&&token!=='null'){
                        var userName = jwt.verify(token,'Kermit').name;
                    }
                    else {
                        this.$router.push({path:'/login'});
                    }

                    let article = {title,contents,time,userName};
                    this.$http.post('/api/postArticle',article).then((res)=>alert(res.data));
                }
            }
        }
    }
</script>
<style lang="less" scoped>
@import "../assets/page.css";

  .title {
      appearance:none;
      border: none;
      outline: none;
      width: 100%;
      height: 2rem;
      font-size: 1rem;
      font-weight: bolder;
  }

  #contents {
      appearance:none;
      outline: none;
      resize: none;
      width: 100%;
      height: 20rem;
      font-size: 0.8rem;
  }

  .preview {
     padding: 0 1rem;
     word-wrap: break-word;

     .pre-contents {
         font-size: 0.5rem;
         line-height: 1.1;
         text-align: left;
     }

  }
</style>
