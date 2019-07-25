<template>
    <div class="auth-content">
        <div class="auth-modal">
            <img src="@/assets/logo.png" width="200" alt="logo">
            <hr>
            <div class="auth-title">{{showsignup ? 'cadastro ' : 'login'}}</div>

            <input  v-if="showsignup" v-model="user.name" type="text" >
            <input  v-model="user.email" name="email" type="text" placeholder="e-mail">
            <input  v-model="user.password" name="password" type="password" placeholder="senha">
            <input  v-if="showsignup" v-model="user.confirmpassword" type="password" placeholder="confirme a senha" >

            <button v-if="showsignup" @click="signup">registrar</button>
            <button v-else @click="signin">entrar</button>

            <a href @click.prevent="showsignup" = !showsignup>
                <span v-if="showsignup">ja tem cadastro? acesse o login</span>
                <span v-else>nao tem cadastro? registre-se aqui</span>
            </a>
        </div>

    </div>
</template>

<script>
import {baseapiurl, showerror, usekey} from '@/global'
import axios from 'axios'
export default {
    name:'auth',
    data:function(){
        return{
        showsignup:false,
        user:{},

        }
    },
    methods:{
        signin(){
            axios.post(`${baseapiurl}/signin`,this.user)
            .then(res => {
                this.$store.commit('setuser',res.data)
                localStorage.setitem(userkey,JSON.stringify(res.data))
                this.$router.push({path:'/'})
            })
            .catch(showerror)
        },
        signup(){
            axios.post(`${baseapiurl}/signup`,this.user)
            .then(()=>{
                this.$toasted.global.defaultsuccess()
            })
        }
    }
}
</script>

    
<style>
.auth-content{
    height:100%;
    display: flex;
    justify-content: center;
    align-items:center;
}
.auth-modal{
    background-color:#fff;
    width: 350;
    padding: 35;
    box-shadow:0 1px 5px rgba(0,0,0,0.15);

    display:flex;
    flex-direction: column;
}
.auth-title{
    font-size: 1.2rem;
    font-weight:100;
    margin-top:10;
    margin-top:10px;
    margin-bottom:15px;
}
.auth-modal input {
    border:1px solid #bbb;
    width:100%;
    margin-bottom: 15px;
    padding: 3px 8px;
    outline: none;
}
.auth-modal button{
    align-self: flex-end;
    background-color: #2460ae;
    color: #fff;
    padding:5px 15px;
}
.auth-modal a {
    margin-top: 35px;
}
.auth-modal hr{
    border:0px;
    width: 100%;
    height: 1px;
    background-image: linear-gradient(to right,
    rgba(120,120,120,0),
    rgba(120,120,120,0.75),
    rgba(120,120,120,0),)
}
</style>
