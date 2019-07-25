const queries = require('./queries')

module.exports = app => {
    const {existsorerror}

    const save = (req, res) => {
        const article = { ...req.body}
        if(req.params.id) article.id = req.params.id

        try{
            existsorerror(article.name, 'nome nao informado')
            existsorerror(article.description,'description nao encontrado')
            existsorerror(article.categoryid,'categoria nao informada')
            existsorerror(article.userid, 'autor nao informado')
            existsorerror(article.content,'conteudo nao informado')
        }catch(msg){
            res.status(400).send(msg)
        }
        if(article.id){
            app.bd('article')
            .update(article)
            .where({id:article.id})
            .then(_=> res.status(204).send())
            .catch(err => res.status(500).send(err))
        }else{
            app.db('articles')
            .insert(article)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) =>{
        try{
            const rowdelete = await app.db('article')
            .where({id:req.params.id}).del()
            try{
                existsorerror(rowdelete,'article nao foi encontrado')
        }catch{
            res.status(500).send(msg)

        }
        }catch(msg){
            res.status(500).send(msg)
        }
    }

    const limit = 10 // usando para paginaçao
    const get = async (req, res)=> {
        const page = req.query.page || 1

        const result = await app.db('article').count('id').first()
        const count = parseint(result.count)

        app.db('articles')
        .select('id','name','description')
        .limit(limit).offset(page * limit - limit)
        .then(article => res.json({data:article,count,limit}))
        .catch(err =>res.status(500).send(err))

       
    }

    const getbyid = (req, res) => {
        app.db('article')
        .where({id:req.params.id})
        .first()
        .then(article => {
            article.content = article.tostring()
            return res.json(article)
        })
        .catch(err => res.status(500).send(err))

    }
    const getbycategory = async (req , res) =>{
        const categoryid = req.params.id
        const page = req.query.page || 1
        const categories = await app.db.raw(queries.categorieswithchildren, categories)
        const ids = categories.rows.map(c => c.id)
        
        //apelido para acessar o db a e  u
        app.db({a: 'article', u:'users'})
            .select('a.id','a.name','a.description', 'a.imageurl',{autor:'u.name'})
            .limit(limit).offset(page * limit - limit)
            .whereraw('?? = ??', ['u.id','a.userid'])
            .wherein('categories',ids)
            .orderby('a.id','desc')
            .then(article => res.json(articles))
            .catch(err => res.status(500).send(err))
    }
    return {save , remove , get , getbyid}

}