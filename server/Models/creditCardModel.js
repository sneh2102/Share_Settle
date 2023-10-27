const mongoose = require('mongoose');

const creditCardSchema = new mongoose.Schema({
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
    }
});

module.exports = mongoose.model('CreditCard', creditCardSchema);