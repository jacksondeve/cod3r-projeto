<template>
    <div class="user-admin">
        <h1>usuarios components</h1>
        
        <b-form>
            <input type="hidden" v-model="user.id" id="user-id">
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="nome" label-for="user-name">
                        <b-form-input id="user-name" type="text" v-model="user.name" required
                            :readonly="mode === 'remove'" 
                            placeholder="informe o nome do usuario">
                        </b-form-input>
                    </b-form-group>    
                </b-col>

                 <b-col md="6" sm="12">
                    <b-form-group label="e-mail" label-for="user-email">
                        <b-form-input id="user-email" type="text" v-model="user.email" required 
                        placeholder="informe o email">
                        </b-form-input>
                    </b-form-group>    
                </b-col>

                <b-form-checkbox id="user-admin" v-model="user.admin" class="mt-3 mb-3">administrador</b-form-checkbox>
                 
                 <b-row v-show="mode === 'save'"
                 <b-col md="6" sm="12">
                    <b-form-group label="password" label-for="user-password">
                        <b-form-input id="user-password" type="text" v-model="user.password" required 
                        placeholder="informe o password">
                        </b-form-input>
                    </b-form-group>    
                </b-col>

                <b-col md="6" sm="12">
                    <b-form-group label="confirmação de password " label-for="user-confirm-password">
                        <b-form-input id="user-confirm-password" type="text" v-model="user.confirmpassword" required 
                        placeholder="confirme o password">
                        </b-form-input>
                    </b-form-group>    
                </b-col>

            </b-row>
            <b-col xs="12">
                <b-button varient="primary" v-if="mode === 'save'"></b-button>
                <b-button hover stripied :items="users"
                @click="save">salvar</b-button>

                <b-botton variant="danger" v-if="mode === 'remove'"
                @click="remove">excluir</b-botton>

                <b-botton @click="reset" class="ml-2">cancelar</b-botton>
            </b-col>
        </b-form>
        <hr>
     
        <b-table hover stripied :item="users" :fields="fields">
            <template slot="actions" slot-scope="data"></template>
                <b-button variant="warning" @click="loaduser(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loaduser(data.item)" class="remove">
                    <i class="fa fa-trash"></i>
                </b-button>
        </b-table>        
       
    </div>
</template>

<script>
import {baseapiurl, showError} from '@global'
import axios from 'axios'

export default {
    name:'useradmin',
    data: function(){
        return{
            mode:'save',
            user:{},
            users:[],
            fields:[
                {key:'id',label:'codigo',sorteble:true},
                {key:'name',label:'nome',sorteble:true},
                {key:'email',label:'nome',sorteble:true},
                {key:'admin',label:'administrador',sorteble:true,
                formatter: value => valeu ? 'sim' : 'nao'},
                {key:'actions',label:'açoes'}
            ]
        }
    },
    methods:{
        loadusers(){
            const url = `${baseapiurl}/users`
            axios.get(url).then(res => {
                this.users = res.data
                console.log(this.users)
            })

        },

        reset(){
            this.mode = 'save'
            this.user = {}
            this.loadusers()
        }
    },

    save(){
        const method = this.user.id ? 'put' : 'post'
        const id = this.user.id ?  `/${this.user.id}`: ''
        axios[method](`${baseapiurl}/users${id}`,this.user)
        .then(()=>{
            this.toasted.global.defautsuccess()
            this.reset()
        })
        .catch(showError)
    },

    remove(){
        const id = this.user.id
        axios.delete(`${baseapiurl}/users/${id}`)
        .then(()=> {
            this.$toasted.global.defaultSuccess()
            this.reset()
        })
        .catch(showError)
    },
    loaduser(user, mode = 'save') {
        this.mode = mode 
        this.user = {...user}// operador spred clona as informaçoes do usuario do formulario
    }

    mountend(){
        this.loadusers()
    }
}
</script>

<style>

</style>
