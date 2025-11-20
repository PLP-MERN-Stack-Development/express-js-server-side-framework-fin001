const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
        id: {
           type: String, required: true, unique: true, 
        },
        name: {
            type: String, required: true
        },
        description: {
            type: String, required: true
        },
        price: {
            type: Number, required: true
        },
        category:
        {
            type: String, required: true, unique: true
        },
        inStock: {
            type: Boolean, required: true       
        }
    },
    { timestamps: true }
);
const Product = mongoose.model('Product', studentSchema);
module.exports = Product;