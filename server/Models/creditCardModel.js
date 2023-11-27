// Importing the mongoose library for defining and interacting with MongoDB schemas.
const mongoose = require('mongoose');

// Defining a MongoDB schema for credit card details.
const creditCardSchema = new mongoose.Schema({
    // Unique identifier for the credit card.
    cardNumber: {
        type: String,
        required: true
    },
    // Name of the cardholder as it appears on the credit card.
    cardHolderName:{
        type: String,
        required: true
    },
    // Expiry date of the credit card.
    expiryDate:{
        type: Date,
        required: true
    },
    // Card Verification Value (CVV) for the credit card.
    cvv:{
        type: Number,
        required: true
    }
});

// Exporting the mongoose model for the credit card schema.
module.exports = mongoose.model('CreditCard', creditCardSchema);