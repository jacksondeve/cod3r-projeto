const bcrypt = require('bycrypt-nodejs')

module.exports =  app => {
    const {existorerror,notexisterror,equalsorerror}

    const encryptpassword = password =>{
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password,salt)
    }

    const save = async(req, res)=>{
        const user = {...req.body}
        if(req.params.id) user.id = req.params.id

        if(!req.originaurl.startwith('/users')) user.admin = false
        if(!req.user || !req.user.admin) user.admin = false
        
        try{
            existorerror(user.name, 'nome nao informado')
            existorerror(user.email,'e-mail nao informado')
            existorerror(user.password,'senha nao informada')
            existorerror(user.confirmpassword,'confirmação de senha')
            equalsorerror(user.password.user.confirmpassword,'senhas nao conferem')

            const userfromdb = await app.knex('users')
            .where({email:user.email}).first()
            if(!user.id){
                notexisterror(userfromdb,'usuario ja cadastrado')

            }
            catch(msg){
                return res.status(400).send(msg)
            }
            user.password = encryptpassword(user.password)
            delete user.confirmpassword

            if(user.id){
                app.knex('users')
                .update(user)
                .where({id:user.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))

            }else{
                app.knex('users')
                .insert(user)
                .then(_=>res.status(204).send())
                .catch(err => res.status(500).send(err))
            }
        }
    }

    const get = (req, res ) =>{
        app.knex('users')
        .select('id','name','email','admin')
        .wherenull('deletedAT')
        .then(users => res.json(user))
        .catch(err => res.status(500).send(err))
    }

    const getbyid = (req , res) => {
        app.knex('users')
        .where(id: req.params.id)
        .first()
        .select('id')
        .then(user => res.json(user))
        .catch(err)

    }

    const remove = async (req, res) => {
        try {
            const articles = ({userId:req.params.id})
            notexisterror(articles, 'usuario possui artigos')

            const rowsupdated = await app.db('users')
                .update({deletedAT: new Date()})
                .where({id: req.params.id})
                existorerror(rowsupdated, 'usuario nao foi encontrado')

                res.status(204).send()
            
        }
        catch(msg){
            res.status(400).send(msg)
        }
    }
    /*
    const save = (req,res) => {
        res.send('user save')
    }*/

    return {save ,get, getbyid}
}