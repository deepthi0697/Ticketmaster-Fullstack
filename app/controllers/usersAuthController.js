const User = require('../models/User')

module.exports.register = (req, res) => {
    const body = req.body
    const user = new User(body)
    user.save()
        .then((user) => {
            res.json(user)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.login = (req, res) => {
    const body = req.body
    User.findByCredentials(body.email, body.password)
        .then((user) => {
           return user.generateToken()
        })
        .then((token) => {
            res.setHeader('x-auth', token)
            res.send(token)
        })
        .catch((Err) => {
            res.json(Err)
        })
}

module.exports.logout = (req, res) => {
    const {user, token} = req
    User.findByIdAndUpdate(user._id, {$pull: {token: {token: token}}})
        .then(function(){
            res.send('sucessfully logged out')
        })
        .catch((err) => {
            res.send(err)
        })
}