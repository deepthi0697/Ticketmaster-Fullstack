const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    mobile: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: Date.now()
    }
})

const Customer = mongoose.model('Customer', CustomerSchema)

module.exports = Customer