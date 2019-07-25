import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
vue.use(vuex)

export default new vuex.store({
    state:{
        ismenuvisible:false,
        user:{
            name:'usuario mock',
            email:'mock@cod3r.com.br'
        }

    },
    mutation: {
        togglemenu(state,isvisible){
            if(!state.user){
                state.ismenuvisible = false
                return
            }

            if(isviseble === undefined){
                state.ismenuvisible !=state.ismenuvisible
                
            }
            else{
                state.ismenuvisible = isvisible
            }
            console.log('togglemenu ='+ state.ismenuvisible)
        },
        setuser(state, user){
            state.user = user
            if(user){
                axios.defaut.headers.common['authorization'] = `bearer ${user.token}`
                state.ismenuvisible = true
            }else{
                delete axios .defaut.header.common['authorization']
                state.ismenuvisible = false
            }
        }
    }
})