const moment = require('moment')
const Article = require('../model/article')

async function getArticle(ctx) {
    const article = await Article.find({_id: ctx.params.id})
    ctx.body = {
        success: true,
        article: article[0]
    }
}

// 修改与发布接口  修改接口需要先获取数据  pv date等
async function postArticle(ctx) {
    const entityContent = Object.assign({
            content: 'hello world',
            pv: 0,
            tab: ['JavaScript'],
            summary: ctx.request.body.title,
            date: moment(moment()).format('YYYY-MM-DD HH:mm'),
            lastModify: moment(moment()).format('YYYY-MM-DD HH:mm'),
            commentsCount: 0
        }, ctx.request.body),
        article = new Article(entityContent)
    
    let createResult = await article.save().catch( error => {
        console.log(error)
        ctx.throw(500, '服务器内部错误')
    })

    console.log('文章创建成功', createResult);
    ctx.body = {
        success: true,
        article: ctx.request.body.title
    }
}

module.exports = {
    getArticle,
    postArticle
}