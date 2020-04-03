const Ticket = require('../models/Ticket')

module.exports.list = (req,res) => {
    Ticket.find().populate('department', ['name']).populate('customer', ['name']).populate('employees', ['name'])
            .then((ticket) => {
            if(ticket){
                res.json(ticket)
            } else {
                res.json({})
            }

        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.create = (req, res) => {
    const body = req.body
    const ticket = new Ticket(body)
    ticket.save()
        .then((ticket) => {
            if(ticket){
                res.json(ticket)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.show = (req, res) => {
    const id = req.params.id
    Ticket.findById(id).populate('department', ['name']).populate('customer', ['name']).populate('employee', ['name'])
    .then((ticket) => {
        if(ticket){
            res.json(ticket)
        } else {
            res.json({})
        }
    })
    .catch((err) => {
        res.json(err)
    })
}

module.exports.update = (req, res) => {
    const body = req.body
    const id = req.params.id
    Ticket.findByIdAndUpdate(id, body, {new: true, runValidators: true}).populate('department', ['name']).populate('customer', ['name']).populate('employee', ['name'])
        .then((ticket) => {
            if(ticket){
                res.json(ticket)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.destroy = (req,res) => {
    const id = req.params.id
    Ticket.findByIdAndDelete(id).populate('department', ['name']).populate('customer', ['name']).populate('employee', ['name'])
        .then((ticket) => {
            if(ticket){
                res.json(ticket)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

