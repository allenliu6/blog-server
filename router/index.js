const Router = require('koa-router')
const topics = require('./topics')
const { getArticle, postArticle } = require('./article')

const router = new Router()

router.get('/topics', topics)
    .get('/article', getArticle)
    .post('/article/publish', postArticle)

module.exports = router