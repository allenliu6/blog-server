const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    comments: [{
        name: String,
        avatar: String,
        content: String,
        date: String,
        reply: [{
            name: String,
            avatar: String,
            content: String,
            date: String
        }]
    }],
    content: String,
    pv: Number,
    tab: [String],
    summary: String,
    title: String,
    date: String,
    lastModify: String,
    commentsCount: Number
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article
    