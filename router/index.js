const router = require('koa-router')
const topics = require('./topics')

const route = new router()

route.get('/', topics)
route.get('/topics', topics)

module.exports = route