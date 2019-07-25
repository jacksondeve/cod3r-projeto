import vue from 'vue'
import toasted from './node_modules/vue-toasted'

vue.use(toasted, {
    iconpacked:'fontawesome',duration:3000
})

vue.toasted.register(
    'defaultsSuccess',
    payload => !payload ? 'operaçao realizada om sucesso' : payload.msg,
    
    {type:'success', icon:'check'})

vue.toasted.register(
    'defaultsError',
    payload => !payload ? 'erro inesperado!!!' : payload.msg,
    {type:'error', icon:'times'})