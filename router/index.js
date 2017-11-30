const Router = require('koa-router')
const topics = require('./topics')
const { getArticle, postArticle, deleteArticle, updateArticle, getOriginArticle } = require('./article')

const router = new Router()

router.get('/topics', topics)
    .get('/article', getArticle)
    .get('/article/publish', getOriginArticle)
    .post('/article', postArticle)
    .post('/article/delete', deleteArticle)
    .post('/article/update', updateArticle)

module.exports = router