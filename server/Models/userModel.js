// Importing the mongoose library for defining and interacting with MongoDB schemas.
const mongoose = require('mongoose');

// Importing the validator library for input validation.
const validator = require('validator')

// Importing the bcrypt library for password hashing.
const bcrypt = require('bcrypt')

// Importing the credit card schema for user credit card details.
const creditCardSchema = require('./creditCardModel');

// Defining a MongoDB schema for users.
const userSchema = new mongoose.Schema({
    // User's name.
    name:{
        type: String,
        required: true
    },
    // User's email with lowercase formatting, must be unique and required.
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    // User's email with lowercase formatting, must be unique and required.
    password: {
        type: String,
        required: true
    },
    // Array containing the groups associated with the user, defaulting to an empty array.
    groups: {
        type: Array,
        default: []
    }
});
// Static method for user signup, creating a new user in the database.
userSchema.statics.signup = async function(name, email, password) {
    // Static method for user signup, creating a new user in the database.
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

    // Checking if the email already exists in the database.
    const exists = await this.findOne({ email })
    if (exists) {
        throw Error("Email Already Exists")  
    }

    // Generating a salt and hash for the password.
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // Generating a salt and hash for the password.
    const user = await this.create({ name, email, password: hash })
    return user
}

// Static method for user login, verifying the user's credentials.
userSchema.statics.login = async function(email, password) {
    // Input validation checks for email and password.
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

    // Finding the user in the database based on the email.
    const user = await this.findOne({ email })
    if (!user) {
        throw Error("Email not registored")  
    }

    // Comparing the provided password with the hashed password in the database.
    const match = await bcrypt.compare(password, user.password)
    if(!match)
    {
        throw Error('Incorrect password')
    }
    // Returning the user if the credentials are valid.
    return user
}

// Static method for handling the forgot password functionality.
userSchema.statics.forgotpass = async function(email) {
    // Input validation check for email.
    if(!email)
    {
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email))
    {
        throw Error('Email is  not valid')
    }

    // Finding the user in the database based on the email.
    const user = await this.findOne({ email })
    if (!user) {
        throw Error("Email not registored")  
    }
    // Returning the user for further processing in the application.
    return user
}

// Static method for resetting the user's password.
userSchema.statics.resetpass = async function(id, password) {
    // Input validation check for the strength of the new password.
    if(!validator.isStrongPassword(password))
    {
        throw Error('Password must contain 8 charactor, alphabats, number, special charactor')
    }
    
    // Generating a new salt and hash for the new password.
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // Updating the user's password in the database based on the user ID.
    const user = await this.findByIdAndUpdate({_id: id }, {password: hash})
    if (!user) {
        throw Error("Email not registored")  
    }
    // Returning the updated user.
    return user
}

// Static method for changing the user's username.
userSchema.statics.changeUsername = async function(id, uname) {
    // Input validation check for the new username.
    if (!uname) {
        throw Error('Name must be filled');
    }
    // Updating the user's name in the database based on the user ID.
    const user = await this.findByIdAndUpdate(id, { name: uname });
    return user; 
};

// Static method for changing the user's password.
userSchema.statics.changePassword = async function(email ,oldPassword, newPassword, newConfirmpassword) {
    // Finding the user in the database based on the email.
    const use = await this.findOne({ email })

    // Comparing the provided old password with the hashed password in the database.
    const match = await bcrypt.compare(oldPassword, use.password)
    if(!match)
    {
        throw Error('Incorrect password')
    }

    // Checking if the new password and confirmation match.
    if(newPassword!=newConfirmpassword)
    {
        throw Error('Password dont match.')
    }

    // Generating a new salt and hash for the new password.
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(newPassword, salt)

    // Updating the user's password in the database based on the user ID.
    const user = await this.findByIdAndUpdate(use._id, { password: hash });
    
    // Returning the updated user.
    return user;
};
// Static method for getting all users.
userSchema.statics.getUser = async function() {
    // Finding and returning all users in the database.
    const user = await this.find();
    return user;


};

// Exporting the mongoose model for the user schema.
module.exports = mongoose.model('User', userSchema)