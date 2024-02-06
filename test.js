const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')
const config = require('./config')

mongoose.connect(config.mongoUri, { dbName: 'blogProject' })

BlogPost.create({
    title: "Test blog post",
    body: "Hello world!!!!"
}).then(result => {
    console.log(result)
}).catch(err => {
    console.log(err)
})