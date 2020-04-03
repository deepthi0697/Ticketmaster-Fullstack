const Department = require('../models/Department')

module.exports.list = (req,res) => {
    Department.find()
        .then((department) => {
            if(department){
                res.json(department)
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
    const department = new Department(body)
    department.save()
        .then((department) => {
            if(department){
                res.json(department)
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
    Department.findById(id)
    .then((department) => {
        if(department){
            res.json(department)
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
    Department.findByIdAndUpdate(id, body, {new: true, runValidators: true})
        .then((department) => {
            if(department){
                res.json(department)
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
    Department.findByIdAndDelete(id)
        .then((department) => {
            if(department){
                res.json(department)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

