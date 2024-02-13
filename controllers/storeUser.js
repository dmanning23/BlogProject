const User = require('../models/User.js')
const path = require('path')

module.exports = (req, res) => {
    User.create(req.body)
    .then(result => {
        console.log(result)
    })
    .catch(err => {
        console.log(err)
    })
    res.redirect('/')
}