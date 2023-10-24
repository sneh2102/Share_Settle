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

    cardDetails: {
        cardNumber: {
            type: String,
            required: true
        },
        cardHolderName:{
            type: String,
            required: true
        },
        expiryDate:{
            type: Date,
            required: true
        },
        cvv:{
            type: Number,
            required: true
        },
        required: true
    },

    groups: {
        type: Array,
        default: []
    }
});

module.exports.userSchema = mongoose.model("User", userSchema);