let mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mern-sei-26', {
    userNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports.User = require('./user')