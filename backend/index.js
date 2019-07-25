const app = require('express')()
const consign = require('consign')
const knex = require('./config/db')
require('./config/mongodb')

app.knex = knex
app.mongoose = mongoose

consign()
.include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./schedule')
    .then('./config/routes.js')
    .then(app)

app.listen(3000,    ()=> {
console.log('executando 2...')
})