const {authsecret} = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const singnin = async (req, res) => {
        if(!req.body.email || !req.body.password)
        return res.status(400).send('informe o usuario e senha ')
    }

    const user = await app.db('users')
    .where({email: req.body.email })
    .first()

    if(!user) return res.status(400).send('usuario nao encontrado!')

    const ismatch = bcrypt.compareSync(req.body.password, user.password)
   if(!ismatch) return res.status(401).send('email/senha invalidos!')

   const now = math.floor(date.now() / 1000)

   const payload ={
       id: user.id,
       name:user.name,
       email:user.email,
       admin:user.admin,
       iat: now,
       exp:now + (60 * 60 * 24 * 3)
   }

   res.json({
       ...payload,
       token: jwt.encode(payload,  authsecret)

   })

   const validatetoken = async (req, res) =>{
       const userdata = req.body || null
       try{
           if(userdata){
               const token = jwt.decode(userdata.token, authsecret)
               if(new date(token.exp * 1000)> new date()){
                   return res.send(true)
               }
           }
       }catch(e){
           //poblema com o token
       }
       res.send(false)
   }
   return {singnin, validatetoken}
}