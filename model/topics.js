const Schema = require('mongoose').Schema

const topicsSchema = new Schema({
    date: {
        type: String
    },
    title: String,
    summary: String,
    id: Number,
    tab: String,
    pv: Number,
    commentCount: Number,
    tags?: String[]
})