const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/gp12', {useNewUrlParser: true}) // gp12是数据库的名字

module.exports = mongoose