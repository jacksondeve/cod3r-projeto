<template>
    <div class="category-admin">
        <h1>usuarios components</h1>
        
        <b-form>
            <input type="hidden" v-model="category.id" id="category-id">
        
               <b-form-group label="categoria pai" label-for="category-parentoid">
                    <b-form-select id="category=parentid"
                    :readonly="mode === 'remove'"
                     placeholder="informe o nome da categoria"/>
                </b-form-group>    
                
                <b-form-group label="categoria pai" label-for="category-parentid">
                    <b-form-select v-if="mode === 'save'"
                        id="category=name" type="text"
                        :readonly="mode === 'remove'" 
                        :options="categories" v-model=" 'remove'">
                    </b-form-select>                     
                    <b-form-input
                        id="category=name" type="text"
                        :readonly="mode === 'remove'" 
                        :options="categories" v-model=" 'remove'">

                    </b-form-input>
                    
                </b-form-group>    
        
                <b-button varient="primary" v-if="mode === 'save'"></b-button>
                <b-button hover stripied :items="categorys"
                @click="save">salvar</b-button>

                <b-botton variant="danger" v-if="mode === 'remove'"
                @click="remove">excluir</b-botton>

                <b-botton @click="reset" class="ml-2">cancelar</b-botton>
        
        </b-form>
        <hr>
     
        <b-table hover stripied :item="categories" :fields="fields">
            <template slot="actions" slot-scope="data"></template>
                <b-button variant="warning" @click="loadcategory(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadcategory(data.item)" class="remove">
                    <i class="fa fa-trash"></i>
                </b-button>
        </b-table>        
       
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
            category:{},
            categorys:[],
            fields:[
                {key:'id',label:'codigo',sorteble:true},
                {key:'name',label:'nome',sorteble:true},
                {key:'path',label:'caminho',sorteble:true},
                {key:'actions',label:'açoes'}
            ]
        }
    },
    methods:{
        loadcategorys(){
            const url = `${baseapiurl}/categories`
            axios.get(url).then(res => {
              //  this.categorys = res.data
              this.category = res.data.mapa(category => 
               return{...category.id, text:category.path} )
                console.log(this.categorys)
            })

        },

        reset(){
            this.mode = 'save'
            this.category = {}
            this.loadcategorys()
        }
    },

    save(){
        const method = this.category.id ? 'put' : 'post'
        const id = this.category.id ?  `/${this.category.id}`: ''
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
    loadcategory(category, mode = 'save') {
        this.mode = mode 
        this.category = {...category}// operador spred clona as informaçoes do usuario do formulario
    },

    mountend(){
        this.loadcategorys()
    }
}
</script>

<style>

</style>
