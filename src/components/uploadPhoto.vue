<template lang="html">
    <ut-upload  action="/api/uploadPhoto"
            name='test'
            multiple type='drag'
            class='demo-drag'
            upload-list>
        <i class='utear-icon-cloud utear-icon'></i>
        <p>将文件拖到此处，或<em>点击上传</em></p>
    </ut-upload>
</template>
<script lang="">
    export default {
        name:'uploadPhoto'
        // Options / Data
        // data () { return {} },
        // props: [],
        // propsData: {},
        // computed: {},
        // methods: {},
        // watch: {},
        // Options / DOM
        // el () {},
        // template: '',
        // render () {},
        // Options / Lifecycle Hooks
        // beforeCreate () {},
        // created () {},
        // beforeMount () {},
        // mounted () {},
        // beforeUpdate () {},
        // updated () {},
        // activated () {},
        // deactivated () {},
        // beforeDestroy () {},
        // destroyed () {},
        // Options / Assets
        // directives: {},
        // filters: {},
        // components: {},
        // Options / Misc
        // parent: null,
        // mixins: [],
        // name: '',
        // extends: {},
        // delimiters: [ '{{', '}}' ],
        // functional: false
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
