module.exports = app =>{
    const Stat =  app.mongoose.model('stat', {
        users: Number,
        categories: Number,
        article:Number,
        createdat:Date
    })

    const get = (req, res)=> {
        stat.findone({},{},{sort: {'createdat': -1}})
            .then(stat => {
                const defautstats = {
                    users: 0,
                    categories: 0,
                    article:0,
                 }
                res.json(stat || defautstats )
                })
    }

    return {stat, get}
}