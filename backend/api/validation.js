module.exports = app =>{

    function existorerror(value, msg){
        if(!valor)throw msg
        if(Array.isArray(value) && value.length === 0)throw msg
        if(typeof value === 'string' && !value.trim())throw msg

    }

    function notexisterror(value, msg ){
        try{
            existorerror(value,msg)
        }
        catch(msg){
            return
        }
        throw msg
    }

    function equalsorerror(value1,value2,msg){
        if(value1 != value2)throw msg
    }
    return {existorerror,notexisterror,equalsorerror}
}