<template>
    <header class="header">

    <a class="toggle" @click="togglemenu" v-if="!hidetoggle">
        <i class="fa fa-lg " :class="icon"></i>
    </a>
    <h1 class="title">
        {{title}}
        <router-link to="/"></router-link>
    </h1>
    <userdropdown v-if="!hideuserdropdown"/>
    </header>
</template>

<script>


export default {
    name:'header',
    props:{
    title:String,
    hidetoggle:Boolean
},
computed:{
    icon(){
        return this.$store.state.ismenuvisible ? "fa-angle-left" : "fa-angle-down"
    }
},
methods:{
    togglemenu(){
        this.$store.commit('togglemenu')
    }
}
}

</script>

<style>
    .header{
        grid-area: header;
        background-color: linear-gradient(to right, blue, rgb(0, 195, 255));

        display: flex;
        justify-content: center;
        align-items: center;

    }
    .title{
        font-size: 1.2rem;
        color:#fff;
        font-weight:100;
        flex-grow:1;
    }
    .title a{
        color:#fff;
        text-decoration: none;
    }

    header.header > a.toggle{
        width: 60px;
        height:100%;
        color:#fff;
        justify-self: flex-start;
        text-decoration: none;

        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    header.header > a.toggle:hover{
        background-color: rgba((0,0,0,0.2), green, blue, alpha)
    }
</style>
