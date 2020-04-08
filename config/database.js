const mongoose = require('mongoose')

const setupDB = () => {
    mongoose.connect('mongodb+srv://deepthi:*********@cluster0-7uxoi.mongodb.net/ticketmaster?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        .then((response) => {
            console.log('connected to db')
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = setupDB
