// 引入依赖
const Koa = require('koa')
const cors = require('koa-cors')
const BodyParser = require("koa-bodyparser");
const logger = require('koa-logger');
const mongoose = require('mongoose')
const router = require('./router')

// 初始化数据、设置
const MONGO_URL = 'mongodb://localhost:27017/allen_blog'
const app = new Koa()
mongoose.set('debug',true);
mongoose.Promise = global.Promise;

// 连接数据库
mongoose.connect(MONGO_URL, {
        useMongoClient: true
    })
    .then(db => {
            console.log('数据库连接成功')
        },
        error => {
            console.log(`数据库连接失败，${error}`)
        }
    )

// 使用中间件   中间件使用顺序问题   遵循洋葱模型
app.use(cors())
    .use(logger())
    .use(BodyParser())
    .use(router.routes())
    .use(router.allowedMethods())

// 启动监听
app.listen(3000)
console.log('Server is listening port 3000, please click http://127.0.0.1:3000/')