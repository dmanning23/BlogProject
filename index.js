const express = require ('express')
const path = require('path')
const mongoose = require('mongoose')
const config = require('./config')
const BlogPost = require('./models/BlogPost.js')

mongoose.connect(config.mongoUri, { dbName: 'blogProject' })

const app = new express()
const ejs = require('ejs')
app.set('view engine', 'ejs')
app.use(express.static('public'))

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.listen(4000, () => {
    console.log('App listening on port 4000')
})

app.get('/', async (req, res)=>{
    const blogposts= await BlogPost.find({})
    res.render('index', {
        blogposts
    })
})

app.get('/about', (req, res)=>{
    res.render('about')
})

app.get('/contact', (req, res)=>{
    res.render('contact')
})

app.get('/post', (req, res)=>{
    res.render('post')
})

app.get('/posts/new', (req, res)=>{
    res.render('create')
})

app.post('/posts/store', async (req, res) => {
    await BlogPost.create(req.body)
    .then(result => {
        console.log(result)
    })
    .catch(err => {
        console.log(err)
    })
    res.redirect('/')
})