const mongoose = require('mongoose');

const sharedExpensesSchema = new mongoose.Schema({
    groupId:{
        type: String,
        required: true
    },
    expenseId:{
        type: String,
        required: true
    },
    dateOfExpense:{
        type: Date,
        default: Date.now
    },
    netAmount:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("SharedExpenses", sharedExpensesSchema);
