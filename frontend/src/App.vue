
<template>
	<div id="app" :class="{'hide-menu': !ismenuvisible || !user}">
		<h1>Versão Inicial</h1>
		<header title="cod3r - base de conhecimento"
		 :hidetoggle="false" :hideuserdropdown="false">
		 </header>
		 <menu v-if="user"></menu>
		 <loading v-if="validatingtoken"></loading>
		<content v-else></content>
	</div>
</template>

<script>
import {baseapiurl, userkey} from "@/global"
import axios from 'axios'
import { header } from "@components/template/header"
import menu from "@components/template/menu"
import content from "@components/template/content"
import footer from "@components/template/footer"

export default {
	name: "App",
	components:{header,menu,content,footer},
	computed: mapstate(['ismenuvisible','user']),
	data: function(){
		return{
			validatingtoken:true
		}
	},
	methods:{
		async validatingtoken(){
			this.validatingtoken = true
			const json = localStorage.getItem(userkey)
			const userdata = JSON.parse(json)
			this.store.commit('setuser',null)

			if(!userdata){
				this.validatingtoken = false
				this.$store.push({name:'auth'})
				return
			}
			const res = await axios.post(`${baseapiurl}/validatetoken`,userdata)

			if(res.data){
				this$store.commit('setuser',userdata)
				 if(this.$mq === 'xs' || this.$mq ==='sm'){
             	   this.store.commit('togglemenu')
            }
			}else{
				localStorage.removeItem(userkey)
				this.$router.push({name:'auth'})
			}
			this.validatingtoken = false
		}
	}
	
}
</script>

<style>
body{
	margin: 0;
}
*{
	font-family: "lato",sans-serif;
}
#app{
	-webkit-font-smoothing:antialiased;
	-moz-osx-font-smoothing:grayscale;

	height: 100vh;
	display: grid;
	grid-template-rows: 60px 1fr 40px;
}

#app.hide-menu{
	grid-template-areas:
	"header header"
	"content  content"
	"footer footer";
}

</style>