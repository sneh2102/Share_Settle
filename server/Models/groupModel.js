// Importing the mongoose library for defining and interacting with MongoDB schemas.
const mongoose = require('mongoose');

// Defining a MongoDB schema for groups.
const groupSchema = new mongoose.Schema({
    // Name of the group.
    name: {
        type: String,
        required: true
    },
    // Array containing the members of the group, defaulting to an empty array.
    members: {
        type: Array,
        default: []
    },
    // Array containing the list of expenses associated with the group.
    groupExpensesList:{
        type: Array
    },
    // Total amount associated with the group, defaulting to 0.
    groupTotal: {
        type: Number, 
        default: 0
    },
    // Settle period for the group.
    settlePeriod:  {
        type: String,
        required: true
    }
});

// Exporting the mongoose model for the group schema.
module.exports = mongoose.model('Group', groupSchema);