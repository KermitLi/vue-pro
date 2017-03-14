<template lang="html">
    <div class="uploadPhoto">
        <ut-upload  action="/api/uploadPhoto"
                name='test'
                multiple type='drag'
                class='demo-drag'
                upload-list @success='success'>
            <i class='utear-icon-cloud utear-icon'></i>
            <p>将文件拖到此处，或<em>点击上传</em></p>
        </ut-upload>
        <p >
            <img v-for='url in urls' :src="url" alt="" style="width:100px;height:100px">
        </p>
    </div>
</template>
<script lang="">
    export default {
        name:'uploadPhoto',
        data(){
            return {
                urls:[]
            }
        },
        methods:{
            success(res){
                if(res.state){
                    this.urls.push(res.url);

                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .demo-drag{
       width:380px;
       color:#99a9bf;
       .utear-icon-cloud{
           line-height:110px;
           font-size:80px;
       }
       p{
           font-size:13px;
           em{
               color:#20a0ff;
               font-style:normal;
           }
       }
    }
</style>
