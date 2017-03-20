var mongoose = require('mongoose');

// Schema defines how the data will be stored in MongoDB
var ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    cost: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    qty: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    likes: []
});


module.export = ProductSchema;