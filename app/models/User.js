const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value){
                return validator.isEmail(value)
            },
            message: function(){
                return 'invalid email format'
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        token: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }]
})



userSchema.pre('save', function(next){
    const user = this
        bcryptjs.genSalt(10)
            .then((salt) => {
                bcryptjs.hash(user.password, salt)
                    .then((encryptedPassword) => {
                        user.password = encryptedPassword
                        next()
                    })
                    .catch((err) => {
                        res.json(err)
                    })
            })
            .catch((err) => {
                res.json(err)
            })
  
})


userSchema.statics.findByCredentials = function(email, password){
    const User = this
    return User.findOne({email})
        .then((user) => {
            if(!user){
                return Promise.reject('invalid email')
            }
            return bcryptjs.compare(password, user.password)
                .then((result) => {
                    if(result){
                        return Promise.resolve(user)
                    } else {
                        return Promise.reject(err)
                    }   
                })
                .catch((err) => {
                    return Promise.reject('invalid password')
                })
        })
        .catch((err) => {
            return Promise.reject(err)
        })
}

userSchema.methods.generateToken = function(){
    const user = this
    const tokenData = {
        _id: user._id,
        name: user.name,
        createdAt: Number(Date.now())
    }
    const token = jwt.sign(tokenData, 'jwt@123')
    user.tokens.push({token: token})

    return user.save()
        .then((user) => {
            return Promise.resolve(token)
        })
        .catch((err) => {
            return Promise.reject(err)
        })
}

userSchema.statics.findByTokens = function(token){
    const User = this
    let tokenData
    try {
        tokenData = jwt.verify(token, 'jwt@123')
    }
    catch(err) {
        return Promise.reject(err)
    }
    return User.findOne({
        _id: tokenData._id,
        'tokens.token': token
    })
    .then((user) => {
        return Promise.resolve(user)
    })
    .catch((err) => {
        return Promise.reject(err)
    })
}

const User = mongoose.model('User', userSchema)
module.exports = User