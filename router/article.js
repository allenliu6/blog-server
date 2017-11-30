const Article = require('../model/article')

async function getArticle(ctx) {
    const article = await Article.find({
        _id: ctx.query.id
    })
        .select({
            summary: 0,
            commentsCount: 0
        })
        .catch(error => console.log(error))

    const prevTitle = await Article.findOne({
        date: { $lt: article[0].date }
    })
        .sort({ date: -1 })
        .select({
            _id: 1,
            title: 1
        })
        .catch(error => console.log(error))

    const nextTitle = await Article.findOne({
        date: { $gt: article[0].date }
    })
        .sort({ date: 1 })
        .select({
            _id: 1,
            title: 1
        })
        .catch(error => console.log(error))

    ctx.body = {
        success: true,
        article: article[0],
        nearArticle: {prevTitle, nextTitle}
    }
}

async function getOriginArticle(ctx) {
    const article = await Article.find({
        _id: ctx.query.id
    })
        .select({
            markdown: 1,
            title: 1,
            tab: 1,
            summary: 1,
        })
        .catch(error => console.log(error))

    ctx.body = {
        success: true,
        article: article[0],
    }
}

// 发布接口  
async function postArticle(ctx) {
    const defaultBody = {
        content: 'hello world',
        pv: 0,
        tab: ['JavaScript'],
        summary: ctx.request.body.title,
        date: Date.now(),
        lastModify: Date.now(),
        commentsCount: 0
    }

    const entityContent = Object.assign(defaultBody, ctx.request.body),
        article = new Article(entityContent)

    let createResult = await article.save().catch(error => {
        console.log(error)
        ctx.throw(500, '服务器内部错误')
    })

    console.log('文章创建成功', createResult);
    ctx.body = {
        success: true,
        id: createResult._id
    }
}

// 修改接口需要先获取数据
async function updateArticle(ctx) {
    const { id, ...updateBody} = ctx.request.body
    updateBody.lastModify = Date.now()

    const result = await Article.update({_id: id}, updateBody)
        .catch(error => console.log(error))

    // 正常 result.result    ok: 1  n: 1  nModified: 1
    const success = result.ok && result.n && result.nModified

    ctx.body = {
        success,
        id,
    }
}

async function deleteArticle(ctx) {
    const result = await Article.deleteOne({
            _id: ctx.request.body.id
        })
        .catch(error => console.log(error))

    // 正常 result.result    ok: 1  n: 1
    ctx.body = {
        success: !!result.result.ok
    }
}

module.exports = {
    getArticle,
    postArticle,
    deleteArticle,
    getOriginArticle,
    updateArticle
}