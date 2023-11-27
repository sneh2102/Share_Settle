// Importing the mongoose library for defining and interacting with MongoDB schemas.
const mongoose = require('mongoose');

// Defining a MongoDB schema for settlements.
const settlementSchema = new mongoose.Schema({
    // User identifier for the settlement receiver.
    settlingTo: {
        type: String,
        required: true
    },
    // User identifier for the settlement provider.
    settlingFrom: {
        type: String,
        required: true
    },
    // Amount involved in the settlement.
    settlementAmount: {
        type: Number,
        required: true
    },
    // Date when the settlement occurred, defaulting to the current date if not specified.
    dateOfSettlement: {
        type: Date,
        default: Date.now
    },
    // Unique identifier for the group associated with the settlement, assuming settlement is associated to a group
    groupId: {
        type: String,
        required: true
    },
    // Array containing the list of expenses associated with the settlement, defaulting to an empty array, assuming settlement is associated to list of expenses
    expenseList:{
        type: Array,
        default: []
    },
});

// Exporting the mongoose model for the settlement schema.
module.exports.settlementSchema = mongoose.model("Settlement", settlementSchema);