const schedule = require('node-schedule')

 module.exports = app => {
    schedule.scheduleJob('*/1 ****',async function (){
        const usercount = await app.db('users').count('id').first()
        const categoriescount  = await app.db('categories').count('id').first()

        const {Stat} = app.api.Stat

        const laststat = await status.findone({},{}, 
            {sort: {'createdAT' : -1}})

        const  stat = new stat ({
            users: userscount.cunt,
            categories: categoriescount.count,
            article: articlecount.count,
            createdAT: new DataCue()
        })    
    })

    const changeusers = !laststat || stat.users !== laststat.users
    const changecategories = !laststat || stat.categories !== laststat.categories
    const changearticle = !laststat ||stat.article !== laststat.article

    if(changeusers || changecategories || changearticle){
        stat.save().then(). console.log("[stats] estatiticas atualizadas!")
    }
 }