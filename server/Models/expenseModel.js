// Importing the mongoose library for defining and interacting with MongoDB schemas.
const mongoose = require('mongoose');

// Defining a MongoDB schema for expenses.
const expenseSchema = new mongoose.Schema({
    // Identifier for the group associated with the expense.
    groupId: {
        type: String,
        required: true
    },
    // Name of the expense.
    name: {
        type: String,
        required: true
    },
    // Description of the expense.
    description: {
        type: String
    },
    // Amount of the expense.
    amount: {
        type: Number,
        required: true
    },
    // Currency of the expense, defaulting to Canadian Dollars (CAD).
    expenseCurrency: {
        type: String,
        default: "CAD"
    },
    // Date when the expense occurred, defaulting to the current date if not specified.
    dateOfExpense: {
        type: Date,
        default: Date.now
    },
    // Category of the expense.
    category: {
        type: String,
        required: true
    },
    // Owner of the expense.
    ownerOfExpense: {
        type: String,
        required: true
    },
    // Array of users involved in the expense.
    involved: {
        type: Array,
        required: true
    },
    // Method of expense distribution among involved users.
    expenseDistribution: {
        type: String,
        required: true
    },
    // Array of users who have settled the expense.
    settledby: {
        type: Array,
        required: true
    }
});

// Exporting the mongoose model for the expense schema.
module.exports = mongoose.model("Expense", expenseSchema);