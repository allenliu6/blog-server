const Router = require('koa-router')
const topics = require('./topics')
const { getArticle, postArticle } = require('./article')

const router = new Router()

router.get('/', topics)
    .get('/topics', topics)
    .get('/article/:title', getArticle)
    .post('/article/publish', postArticle)

module.exports = router