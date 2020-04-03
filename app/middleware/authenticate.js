const User = require('../models/User')

const authenticateUser = function(req, res, next){
    const token = req.header('x-auth')
    User.findByTokens(token)
    .then((user)=>{
        if(user){
            req.user = user,
            req.token = token
            next()
        }
    })
    .catch((err) => {
        res.status('401').send(err)
    })
}

module.exports = authenticateUser