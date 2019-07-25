module.exports = app => {
    const { existsorerror, notexistsorerror} = app.api.validation

    const save = (req, res) =>{
        const category ={ 
            id:req.body.id,
            name:req.body.name,
            parentid:req.body.parentid
        }
        if(req.params.id) category.id = req.params.id

        try{
            existsorerror(category.name, 'nome nao informado')

        }catch(msg){
            return res.status(400).send(msg)
        }
        if(category.id){
            app.db('categories')
            .upadate(category)
            .where({id:category.id})
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        }
        else{
            app.db('categories')
            .insert(category)
            .then(_=> req.status(204).send())
            .catch(err => res.status(500).send(err))

        }
    }
    const remove = async (req, res) => {
        try{
            existsorerror(req.params.id,'codigo da categoria nao informado')

            const subcategory = await app.db('categories')
            .where({parentid: req.params.id})

            notexistsorerror(subcategory,'categoria possui subcategorias')

            const articles = await app.db('article')
            .where({categoriaid: req.params.id})
            notexistsorerror(articles,'categoria possui article')

            const rowsdeleted = await app.db('categories')
            .where({id: req.params.id}).del()
            existsorerror(rowsdeleted,'categoria nao foi encontrada')

            res.status(204).send()
        }catch(msg){
            res.status(400).send(msg)
        }
    }
    const withpath = cateories => {
        const getparent = (categories, parentid) => {
            const parent = categories.filter(parent => parent => parent.id === parentid)
            return parent.length ? parent[0] : null
        }

        const categorieswithpath = categories.map(category => {
            let path = categoru.name 
            let parent = getparent(categories,category.parentid)

            while(parent){
                path = `${parent.name}> ${path}`
                parent = getparent(categories,parent.parentid)
            }
            return {...category,path}

        })
        categorieswithpath.sort((a,b) =>{
            if(a.path < b.path) return -1
            if(a.path > b.path)return 1

            return 0
        })
        return categorieswithpath
    }
    const get = (req,res) =>{
        app.db('categories')
        .then(categories => res.json(withpath(categories)))
        .catch(err => res.status(500).send(err))
    }

    const getbyid = (req,res) =>{
        app.db('categories')
        .where({id: req.params.id})
        .first()
        .then(categories => res.json(categories))
        .catch(err => res.status(500).send(err))
    }

    const totree = (categories, tree )=> {
        if(!tree) tree = categories.filter(c => !c.parentid)
        tree = tree.map(parentnode => {
            const ischild = node => node.parentid == parentnode.id
            parentnode.children = totree(categories, categories.filter(ischild))
            return parentnode
        })
        return tree
    }

    const gettree = (req ,res)=>{
        app.db('categories')
        .then(categories => res.json(totree(withpath(categories))))
        .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getbyid, gettree}
}