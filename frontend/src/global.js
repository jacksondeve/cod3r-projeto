import vue from 'vue'

export  const userkey = '__knowledge_user'


export const baseapiurl = 'http://localhost:3000'

export function showError(e){
    if(e && e.response && e.response.data){
    vue.toasted.global.defaultError({msg : e.response.data})
    }
    else if( typeof e === 'string'){
    vue.toasted.global.defaultError({msg : e})
    }
    else{
    vue.toasted.global.defaultError()
    }
}

export default {showError, baseapiurl, userkey}