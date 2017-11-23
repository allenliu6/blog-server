const Article = require('../model/article')

module.exports = async (ctx) => {
    console.log('get topics' + Object.values(ctx.params).join(" "))
    const {tab = 'all', page = 1} = ctx.params
    if(tab === 'all'){
        ctx.body = await Article.find({}).limit(10)
    } else {
        ctx.body = await Article.find({tab}).limit(10)
    }
}