const mongoose = require('mongoose')
const bcrypt = require('bcrypt')  
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required:  true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.statics.signup = async function(name, email, password) {
    if(!email || !password || !name)
    {
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email))
    {
        throw Error('Email is  not valid')
    }
    if(!validator.isStrongPassword(password))
    {
        throw Error('Password must contain 8 charactor, alphabats, number, special charactor')
    }

    const exists = await this.findOne({ email })
    if (exists) {
        throw Error("Email Already Exists")  
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ name, email, password: hash })
    return user
}
userSchema.statics.login = async function(email, password) {
    if(!email || !password)
    {
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email))
    {
        throw Error('Email is  not valid')
    }
    if(!validator.isStrongPassword(password))
    {
        throw Error('Password must contain 8 charactor, alphabats, number, special charactor')
    }
    const user = await this.findOne({ email })
    if (!user) {
        throw Error("Email not registored")  
    }

    const match = await bcrypt.compare(password, user.password)
    if(!match)
    {
        throw Error('Incorrect password')
    }
    return user
}
userSchema.statics.forgotpass = async function(email) {
    if(!email)
    {
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email))
    {
        throw Error('Email is  not valid')
    }
    const user = await this.findOne({ email })
    if (!user) {
        throw Error("Email not registored")  
    }
    return user
}
userSchema.statics.resetpass = async function(id, password) {
    if(!validator.isStrongPassword(password))
    {
        throw Error('Password must contain 8 charactor, alphabats, number, special charactor')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.findByIdAndUpdate({_id: id }, {password: hash})
    if (!user) {
        throw Error("Email not registored")  
    }
    return user
}

module.exports = mongoose.model('User', userSchema) 
