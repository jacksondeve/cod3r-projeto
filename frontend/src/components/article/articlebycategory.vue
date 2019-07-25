<template>
    <div class="articles-by-category">
        <pagetitle icon="fa fa folder-o" :main="category.name" sub="categories"></pagetitle>
        
        <ul>
            <li v-if="article in article" :key="articles.id">
                <articleitem :article="article"></articleitem>
            </li>
            {{article.name}}
        </ul>

        <div class="lead-more">
            <button v-if="leadmore" class="btn btn-lg btn-outline-primary"></button>
        </div>

    </div>
    
</template>

<script>
import {baseapiurl} from '@/global'
import axios from 'axios'
import pagetitle from '../template/pagetitle'
import articlebycategory from '@/components/articles/articlesbycategory'

export default {
    name:'articlebycategori',
    components:{pagetitle,article},
    data: function(){
        return{
            category:{},
            article:[],
            page:1,
            loadmore:true
        }
    },
    methods:{
        getcategory(){
            const url = `${baseapiurl}/categories/${this.category.id}`
            axios(url).then(res => this.category = res.data)
        }
    },
    getarticle(){
        const url = `${baseapiurl}/categories/${this.category.id}/articles?=${this.page}`
        axios(url).then(res =>{
            this.article = this.article.concat(res.data)
            this.page++

            if(res.data.length === 0) this.loadmore = false
        })
    },
    watch:{
        $route(to){
            this.category.id = to.params.id
            this.articles = []
            this.page = 1
            this.loadmore = true

            this.getcategory()
            this.getarticle()
}
    },
    mounted(){
        this.category.id = this$route.params.id
        this.getcategory()
        this.getarticle()
    }

}
</script>

<style>
.article-by-category ul {
    list-style-type: none;
    padding: 0;
}
.article-by-category .load-more{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 25px;

}

</style>
