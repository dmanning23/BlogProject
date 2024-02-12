const BlogPost = require('../models/BlogPost.js')

module.exports = async (req, res)=> {
    const blogposts= await BlogPost.find({}).sort([['datePosted', -1]]);
    res.render('index', {
        blogposts
    });
}