const Employee = require('../models/Employee')

module.exports.list = (req,res) => {
    Employee.find().populate('department', ['name'])
        .then((employee) => {
            if(employee){
                res.json(employee)
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
    const employee = new Employee(body)
    employee.save()
        .then((employee) => {
            if(employee){
                res.json(employee)
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
    Employee.findById(id).populate('department', ['name'])
    .then((employee) => {
        if(employee){
            res.json(employee)
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
    Employee.findByIdAndUpdate(id, body, {new: true, runValidators: true}).populate('department', ['name'])
        .then((employee) => {
            if(employee){
                res.json(employee)
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
    Employee.findByIdAndDelete(id).populate('department', ['name'])
        .then((employee) => {
            if(employee){
                res.json(employee)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

