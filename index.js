const express = require ('express')
const path = require('path')
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://dmanning23:kX846Du8SRhThZK2@cluster0.mxcwow6.mongodb.net/?retryWrites=true&w=majority",
    {dbName: 'blogProject'})

const app = new express()
const ejs = require('ejs')
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.listen(4000, () => {
    console.log('App listening on port 4000')
})

app.get('/', (req, res)=>{
    res.render('index')
    //res.sendFile(path.resolve(__dirname, 'pages/index.html'))
})

app.get('/about', (req, res)=>{
    res.render('about')
    //res.sendFile(path.resolve(__dirname, 'pages/post.html'))
})

app.get('/contact', (req, res)=>{
    res.render('contact')
    //res.sendFile(path.resolve(__dirname, 'pages/post.html'))
})

app.get('/post', (req, res)=>{
    res.render('post')
    //res.sendFile(path.resolve(__dirname, 'pages/post.html'))
})