const {authsecret} = require('../.env')
const passport = require('passport')
const passportjwt = require('passport-jwt')
const {strategy, extract} = passportjwt

module.exports = app => {
    const params = {
        secretorkey: authsecret,
        jwtfromrequest: extractjwt.fromauthasbearertoken()

    }
    const strategy = new strategy(params, (payload, done) => {
        app.db('users')
        .where({id: payload.id})
        .first()
        .then(user => done(null, user ? {...payload}:false))
        .catch(err => done(err , false))

    })
    passport.use(strategy)

    return {
        authenticate: () => passport.authenticate('jwt', {session:false})
    }
}