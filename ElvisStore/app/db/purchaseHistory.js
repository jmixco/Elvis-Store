var mongoose = require('mongoose');

// Schema defines how the data will be stored in MongoDB
let PurchaseHistorySchema = new mongoose.Schema({
    userId: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    productId: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    unitCost: {
    	type: Number,
    	required: true,
    	min: 0,
    	default: 0
    },
    inserted:{
    	type: Date,
    	required: true,
    	default: Date.now    
    }
});

module.exports = PurchaseHistorySchema;