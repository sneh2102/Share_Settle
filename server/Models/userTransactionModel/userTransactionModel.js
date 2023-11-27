// Importing the mongoose library for defining and interacting with MongoDB schemas.
const mongoose  = require('mongoose');

// Defining a MongoDB schema for user transactions.
const userTransactionSchema = new mongoose.Schema({
    // Identifier for the user making the transaction.
    fromUser: {
        type: String,
        required: true
    },
    // Identifier for the user receiving the transaction.
    toUser: {
        type: String,
        required: true
    },
    // Array to store shared expenses related to the transaction, defaulting to an empty array.
    sharedExpenses: {
        type: Array,
        default: []
    },
    // Total amount involved in the transaction.
    totalAmount: {
        type: Number,
        required: true
    }
});

// Exporting the mongoose model for the user transaction schema.
module.exports.userTransactionSchema = mongoose.model("UserTransaction", userTransactionSchema);