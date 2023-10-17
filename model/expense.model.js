const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    amount: {
        type: Number,
        required: true
    },
    expenseCurrency: {
        type: String,
        default: "CAD"
    },
    dateOfExpense: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String,
        required: true
    },
    ownerOfExpense: {
        type: String,
        required: true
    },
    involved: {
        type: Array,
        required: true
    },
    expenseDistribution: {
        type: String,
        default: "equal"
    },
    // assuming that expense is linked to a group
    groupId: {
        type: String,
        required: true
    }
});

module.exports.userSchema = mongoose.model("expense", expenseSchema);