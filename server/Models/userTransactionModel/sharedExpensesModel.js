// Importing the mongoose library for defining and interacting with MongoDB schemas.
const mongoose = require('mongoose');

// Defining a MongoDB schema for shared expenses within a group.
const sharedExpensesSchema = new mongoose.Schema({
    // Unique identifier for the group associated with the shared expense.
    groupId:{
        type: String,
        required: true
    },
    // Unique identifier for the shared expense.
    expenseId:{
        type: String,
        required: true
    },
    // Date when the expense occurred, defaulting to the current date if not specified.
    dateOfExpense:{
        type: Date,
        default: Date.now
    },
    // Net amount of the shared expense.
    netAmount:{
        type: Number,
        required: true
    }
});

// Exporting the mongoose model for the shared expenses schema.
module.exports.sharedExpensesSchema = mongoose.model("SharedExpenses", sharedExpensesSchema);