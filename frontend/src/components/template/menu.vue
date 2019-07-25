<template>
    <aside class="menu" v-show="ismenuvisible">
    <div class="menu-filter">
        <i class="fa fa-search fa-lg"></i>
        <input type="text" placeholder="digite para filtrar">
    </div>
    <tree :data="treedata" :options="treeoptions"
    ref="tree"></tree>
    </aside>
</template>

<script>
import {mapstate} from 'vuex'
import tree from 'liquor-tree'
import {baseapiurl} from '@/global'
import axios from 'axios'

export default {
    name:'menu',
    computed:mapState(['ismenuvisible']),
    data: function(){
        return {
            treedata: this.gettreedata(),
            treeoptions:{
                propertynames:{'text': 'name'},
                filter:{ emptytext:'categoria nao encontrada'}
            }
        }
    },
    methods:{
        gettreedata(){
            const url = `${baseapiurl}/categories/tree`
            return axios.get(url).then(res => res.data)
        },
        onnodeselect(node){
            this.$router.push({
                name:'articlebycategory',
                params:{id:node.id}
            })
            if(this.$mq === 'xs' || this.$mq ==='sm'){
                this.store.commit('togglemenu')
            }
        }
    }
}
</script>

<style>
    .menu{
        grid-area: menu;
        background-color: linear-gradient(to right #232526, #414345);

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }
    .menu a, .menu a:hover{
        color: #fff;
        text-decoration: none;

    }
    .menu .tree-node.selected > .tree-content,
    .menu .tree-node .tree-content:hover {
        background-color: rgba(255, 255, 255, 0.2)
    }
    .tree-arrow.has-child{
        filter:brightness(2);
    }
    .menu .menu-filter{
        display: flex;
        justify-content: center;
        align-items: center;

        margin: 20px;
        padding-bottom: 8px;
        border-bottom: 1px solid #aaa;
    }
    .menu .menu-filter i {
        color: aaa;
        margin-right: 10px;

    }
    .menu input{
        color: #ccc;
        margin-left: 20px;
        font-size: 1.3rem;
    }
</style>
