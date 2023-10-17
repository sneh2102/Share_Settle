const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    // optional
    // phone_number: {
        
    // }
});

module.exports.userSchema = mongoose.model("user", userSchema);