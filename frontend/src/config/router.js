import vue from  'vue'
import vuerouter from 'vue-router'

import home from '@/components/home/home'
import adminpage from '@/components/admin/adminpage'
import articlebycategory from '@/components/article/articlebycategory'
import auth from '@/component/auth/auth'
import articlebyid from '@/component/article/articlebyid'
import {userkey} from '@/global'

vue.use(vourouter)

const routes = [{
    name:'home',
    path:'/',
    component:home
},
{
    name:'adminpages',
    path:'admin/',
    component:adminpages,
    meta:{requireadmin:true}

},{
    name:'articlebycategory',
    path:'/categories/:id/article',
    component:articlebycategory

},{
    name:'articlebyid',
    path:'/article/:id',
    component:articlebyid
},{
    name:'auth',
    path:'/auth',
    component:auth
}]
const router = new vuerouter({
    mode:'history',
    routes
})

router.beforeeach((to, from, next) => {
    const json = localStorage.getItem(userkey)

    if(to.matched.some(record => record.meta.requiresadmin)){
        const user = JSON.parse(json)
        user && user.admin ? next() : next({path: '/'})
    }else{
        next()
    }
})
export default router
