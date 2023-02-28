const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    image: {
        type: String
    },
    location: {
        type: String
    },
    postedAt: {
        type: String
    },
    price: {
        type: Number
    }
});

const products = mongoose.model("products", productSchema);

module.exports = products;