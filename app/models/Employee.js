const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'There must be 10 digits in phone number']
    },
    department: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Department'
    }
})

const Employee = mongoose.model('Employee', employeeSchema)

module.exports = Employee