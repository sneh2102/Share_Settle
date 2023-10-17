const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    groupOwner: {
        type: String
    },
    members: {
        type: Array,
        default: []
    },
    
});