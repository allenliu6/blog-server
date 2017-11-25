const Article = require('../model/article')

module.exports = async (ctx) => {
    console.log('get topics' + Object.values(ctx.params).join(" "))
    const { tab = 'all', page = 1, limit = 10 } = ctx.params
    const skip = limit * (+page - 1)
    if (tab === 'all') {
        const topics = await Article.find()
            .sort({ date: -1 })
            .skip(skip)
            .limit(limit)
            .select({
                date: 1,
                title: 1,
                summary: 1,
                tab: 1,
                pv: 1,
                commentsCount: 1
            })
            .catch(error => console.log(error))

        let allNum = await Article.count().catch(err => {
            this.throw(500, '服务器内部错误')
        })

        ctx.body = {
            topics,
            success: true,
            allPage: Math.ceil(allNum / limit)
        }
    } else {
        const tabArr = tab.split(",")
        const topics = await Article.find({
            tab: { $in: tabArr }
        })
            .sort({ date: -1 })
            .skip(skip)
            .limit(limit)
            .select({
                date: 1,
                title: 1,
                summary: 1,
                tab: 1,
                pv: 1,
                commentsCount: 1
            })
            .catch(error => console.log(error))
            
        let allNum = await Article.count().catch(err => {
            this.throw(500, '服务器内部错误')
        })

        ctx.body = {
            topics,
            success: true,
            allPage: Math.ceil(allNum / limit)
        }
    }
}