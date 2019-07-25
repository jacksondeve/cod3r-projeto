<template>
<div class="article-by-id">
    <pagetitle icon="fa fa-file-o" :main="article.name" :sub="article.description"></pagetitle>
    <div class="article-content" v-html="article.contet"></div>
</div>
    
</template>

<script>
import 'highlightjs/style/dracula.css'
import hljs from 'highlightjs/highlightjs.pack.js'
import {baseapiurl} from '@/global'
import axios from axios
import pagetitle from '../template/pagetitle'

export default {
    name:'articlebyid',
    components:{pagetitle},
    data:function(){
        return {
            article:{}
        }
    },
    mounted(){
        const url = `${baseapiurl}/article/${this.$route.param.id}`
        axios.get(url).then(res => this.article = res.data)
    },
    update(){
        document.querySelectorAll('.article-content pre').forEach(e => {
            hljs.highlightblock(e)
        })
    }
}
</script>

<style>
    .article-content{
        background-color: #fff;
        border-radius: 8px;
        padding: 25px;

    }
    .article-content pre {
        padding: 20px;
        border-radius:8px;
        font-size: 1.2rem;

    }
    .article-content img{
        max-width: 100%;

    }
    .article-content :last-child{
        margin-bottom: 0px;
    }
</style>
