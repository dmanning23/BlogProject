const express = require ('express')
const mongoose = require('mongoose')
const config = require('./config')

mongoose.connect(config.mongoUri, { dbName: 'blogProject' })

const app = new express()
const ejs = require('ejs')
app.set('view engine', 'ejs')
app.use(express.static('public'))

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const fileUpload = require('express-fileupload')
app.use(fileUpload())

app.listen(4000, () => {
    console.log('App listening on port 4000')
})

const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newPostController = require('./controllers/newPost')

app.get('/', homeController)
app.get('/posts/store', storePostController)
app.get('/post/:id', getPostController)
app.get('/posts/new', newPostController)
