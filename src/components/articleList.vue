<template lang="html">
    <div class="articleList">
        <ut-row class='contents'>
            <ut-col :span='4'></ut-col>
            <ut-col :span='16'>
                <ut-card>
                    <div slot="header" class='clearFix'>
                        <router-link to='#' class='headPic'><img src="../assets/images/logo.jpg" alt="" class=' avatar'></router-link>
                        <div class="articleInfo">
                            <span class='author'>李炫</span><span class='time'>2016.03.22</span>
                        </div>
                        <ut-dropdown style="float: right;">
                                <i class="material-icons edit">mode_edit</i>
                                <template slot='dropdown'>
                                    <ut-dropdown-item>编辑</ut-dropdown-item>
                                    <ut-dropdown-item>删除</ut-dropdown-item>
                                </template>
                        </ut-dropdown>
                    </div>
                    <div>
                        <router-link to='#' class="article-title">Javascript中的闭包机制</router-link>
                        <article class="article-content">
                        Javascript中的闭包机制Javascript中的闭包机制Javascript中的闭包机制Javascript中的闭包机制dawfsefsgr
                        Javascript中的闭包机制Javascript中的闭包机制Javascript中的闭包机制Javascript中的闭包机制
                        Javascript中的闭包机制Javascript中的闭包机制Javascript中的闭包机制Javascript中的闭包机制
                        Javascript中的闭包机制Javascript中的闭包机制Javascript中的闭包机制Javascript中的闭包机制
                        Javascript中的闭包机制Javascript中的闭包机制Javascript中的闭包机制Javascript中的闭包机制
                        Javascript中的闭包机制Javascript中的闭包机制Javascript中的闭包机制Javascript中的闭包机制
                        Javascript中的闭包机制Javascript中的闭包机制Javascript中的闭包机制Javascript中的闭包机制
                        Javascript中的闭包机制Javascript中的闭包机制Javascript中的闭包机制Javascript中的闭包机制
                        Javascript中的闭包机制Javascript中的闭包机制Javascript中的闭包机制Javascript中的闭包机制
                        Javascript中的闭包机制Javascript中的闭包机制Javascript中的闭包机制Javascript中的闭包机制
                        Javascript中的闭包机制Javascript中的闭包机制Javascript中的闭包机制Javascript中的闭包机制
                        </article>
                    </div>
                    <router-link to='#' class='readMore'>查看更多</router-link>
                </ut-card>
            </ut-col>
            <ut-col :span='4'></ut-col>
        </ut-row>
    </div>
</template>
<script lang="">
    export default {
    }
</script>
<style lang="less" scoped>
    .articleList {
        width: 100%;
        height: 93.3%;
        border:1px solid #000;

        .contents {
            height:100%;

            .utear-col {
                height:100%;

                .utear-card {
                    margin-top:1rem;
                    // border:none;
                    .utear-card-header {
                        .headPic {
                            float:left;
                        }

                        .articleInfo {
                            display:inline-block;
                            float:left;
                            margin-left:0.6rem;
                            
                            .author {
                                display:block;
                                color:#212121;
                                font-weight:600;
                                font-size:0.5rem;
                                text-align:left;
                            }

                            .time {
                                display:block;
                                margin-top:0.3rem;
                                font-size:0.45rem;
                                color:#BDBDBD;
                            }
                        }

                        .edit {
                            cursor:pointer;
                        }
                    }
                    
                    .utear-card-body {
                        .article-title {
                            font-size:0.7rem;
                            color:#03A9F4;
                            white-space:nowrap;
                            overflow:hidden;
                            text-overflow:ellipsis;
                        }

                        .article-title:hover{
                            color:#0288D1;
                        }

                        .article-content {
                            font-size:0.6rem;
                            line-height: 1.4;
                            word-break: break-all;
                            color:#424242;
                            height: 5rem;
                            margin-top: 0.4rem;
                            overflow : hidden;
                        }
                    }

                    .readMore {
                        font-size:0.5rem;
                        color:#4FC3F7;
                        position: absolute;
                        right: 1rem;
                        bottom: 0.4rem;
                    }

                    .readMore:hover{
                        color:#29B6F6;
                    }
                }

            }
        }
    }
</style>
