<template>
    <div class="category-admin">
        <h1>usuarios components</h1>
        
        <b-form>
            <input type="hidden" v-model="article.id" id="article-name">
                <b-form-group label="categoria pai" label-for="category-parentoid">
                    <b-form-select id="article=parentid"
                    :readonly="mode === 'remove'"
                     placeholder="informe o nome da categoria"/>
                </b-form-group>    
                
                <b-form-group v-if="mode === 'save'" >
                    <b-form-select v-model="article.name" required 
                        label="categoria pai" label-for="article-parentid"
                        id="article=name" type="text"
                        :v-model="article.imageurl" required
                        :readonly="mode === 'remove'" 
                        :options="categories">
                </b-form-select> 
                 
                 <b-form-group>
                     <b-form-select v-if="mode === 'save'" label="conteudo" 
                        id="image(url):"  label-for="article-imageurl" type="text"
                        :readonly="mode === 'remove'" 
                        :options="categories">
                    </b-form-select>  
                </b-form-group >
              

                <b-form-group v-if="mode === 'save'" label-for="category-parentoid" label="categoria:">
                    <b-form-select id="article=userid"
                     :options="categories" v-model="article.categoryid"/>
                </b-form-group>   

                 <b-form-group v-if="mode === 'save'"  label-for="article-content" label="categoria">
                    <b-form-select id="article=userid"
                     :options="categories" v-model="article.userid"/>
               </b-form-group> 

                <b-form-group v-model=" article.content">
               <vueeditor label="autor"
                    placeholder="informe o conteudo do artigo" />        
                </b-form-group>





                <b-button varient="primary" v-if="mode === 'save'"></b-button>
                <b-button hover stripied :items="articles"
                @click="save">salvar</b-button>

                <b-botton variant="danger" v-if="mode === 'remove'"
                @click="remove">excluir</b-botton>

                <b-botton @click="reset" class="ml-2">cancelar</b-botton>
        
        </b-form>
        <hr>
     
        <b-table hover stripied :item="article" :fields="fields">
            <template slot="actions" slot-scope="data"></template>
                <b-button variant="warning" @click="loadarticle(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadcategory(data.item)" class="remove">
                    <i class="fa fa-trash"></i>
                </b-button>
        </b-table>        

        <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit"></b-pagination>
       
    </div>
</template>

<script>
import {baseapiurl, showError} from '@global'
import axios from 'axios'

export default {
    name:'categoryadmin',
    data: function(){
        return{
            mode:'save',
            article:{},
            article:[],
            categories:[],
            user:[],
            page:1,
            limit:0,
            count:0,
            fields:[
                {key:'id',label:'codigo',sorteble:true},
                {key:'name',label:'nome',sorteble:true},
                {key:'description',label:'descrição',sorteble:true},
                {key:'actions',label:'açoes'}
            ]
        }
    },
    methods:{
        loadarticles(){
            const url = `${baseapiurl}/article?=${this.page}`
            axios.get(url).then(res => {
            this.article =  res.data.data
            this.article =res.data.count
            this.limit = res.data.limit})

        },

        reset(){
            this.mode = 'save'
            this.article = {}
            this.loadcategorys()
        }
    },

    save(){
        const method = this.article.id ? 'put' : 'post'
        const id = this.article.id ?  `/${this.category.id}`: ''
        axios[method](`${baseapiurl}/categorys${id}`,this.category)
        .then(()=>{
            this.toasted.global.defautsuccess()
            this.reset()
        })
        .catch(showError)
    },

    remove(){
        const id = this.category.id
        axios.delete(`${baseapiurl}/categorys/${id}`)
        .then(()=> {
            this.$toasted.global.defaultSuccess()
            this.reset()
        })
        .catch(showError)
    },
    loadarticle(article, mode = 'save') {
        this.mode = mode 
        axios.get(`${baseapiurl}/article${article.id}`).then(res => this.article = res.data)// operador spred clona as informaçoes do usuario do formulario
    },

    loadcategorys(){
        const url = `${baseapiurl}/categories`
        axios.get(url).then(res => {
            this.categories = res.data.map(category => {
                return {value:category.id, text:category.path}
            })
        })
    },

    loadusers(){
        const url = `${baseapiurl}/users`
        axios.get(url).then(res => {
            this.users = res.data.map(user => {
                return {value: user.id, text:`${user.name} - ${user.email}`}
            })
        })
    },
    watch:{
        page(){
            this.loadarticles()
        }
    },

    mountend(){
        this.loadarticle()
    }
}
</script>

<style>

</style>
