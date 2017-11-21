const Koa = require('koa')
const route = require('./router')
const mongoose = require('mongoose')
const BodyParser = require("koa-bodyparser");
const logger = require('koa-logger');
const app = new Koa()

app.use(logger());
app.use(BodyParser())
app.use(route.routes()).use(router.allowedMethods())

app.listen(3000)
console.log('Server is listening port 3000, please click 127.0.0.1:3000/')