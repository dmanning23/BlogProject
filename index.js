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

const fileUpload = require('express-fileupload')
app.use(fileUpload())

app.listen(4000, () => {
    console.log('App listening on port 4000')
})

app.get('/', async (req, res)=>{
    const blogposts= await BlogPost.find({}).sort([['datePosted', -1]]);
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

app.get('/post/:id', async (req, res)=>{
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {
        blogpost
    })
})

app.get('/posts/new', (req, res)=>{
    res.render('create')
})

app.post('/posts/store', async (req, res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, "public/img", image.name), async (error) =>{
        await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name
        })
        .then(result => {
            console.log(result)
        })
        .catch(err => {
            console.log(err)
        })
        res.redirect('/')
    })
})