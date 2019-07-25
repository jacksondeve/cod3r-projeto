
//rotas das api do db
module.exports = app => {

    app.post('/signup', app.api.user.save)
    app.post('/singnin', app.api.auth.signin)
    app.post('/validatetoken', app.api.auth.validatetoken)

    app.route('/user')
    .all(app.config.passport.authenticate())
    .post(admin(app.api.user.save)
    .get(admin(app.api.user.get)
    

    app.route('/users/:id')
    .all(app.config.passport.authenticate())
    .put(admin(app.api.user.save)
    .get(admin(app.api.user.getbyid)
    .delete(admin(app.api.user.remove))

    app.route('/categories')
    .all(app.config.passport.authenticate())
    .get(admin(app.api.category.get)
    .post(admin(app.api.category.save)

    //cuidado com a orderm tem que vir antes dde /categories/:id
    .all(app.config.passport.authenticate())
    app.route('/categories/tree')
    .get(app.api.category.gettree)

    app.route('/categories/:id')
    .all(app.config.passport.authenticate())
    .get(app.api.category.getbyid)
    .put(admin(app.api.category.save)
    .delete(admin(app.api.category.remove)

    app.route('/article')
    .all(app.config.passport.authenticate())
    .get(admin(app.api.article.get)
    .post(admin(app.api.article.save)

    app.route('/articles/id:')
    .all(app.config.passport.authenticate())
    .get(admin(app.api.article.getbyid)
    .put(admin(app.api.article.save)
    .delete(app.api.article.delete)

    app.route('/categories/id:/aritcles')
    .all(app.config.passport.authenticate())
    .get(app.api.article.getbycategory)

    app.route('/stats')
    .all(app.config.passport.authenticate())
    .get(app.api.stat.get)

    app.route('/stats')
    .get(app.api.stat.get)
}
