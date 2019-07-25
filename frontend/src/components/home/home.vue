<template>
    <div>
        <pagetitle icon="fa fa-home" main="dashboard"
        sub="base de conhecimento"/>
    </div>
</template>

<script>
import pagetitle from '../template/pagetitle'

export default {
name:'home',
components:{pagetitle,stat},
data: function(){
    return {
        stat:{}
    }
},
methods:{
    getstats(){
        axios.get(`${baseapiurl}/stats`).then(res => this.stat = res.data)
    }
}

}
</script>

<style>
.stat{
    
    display:flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

</style>
