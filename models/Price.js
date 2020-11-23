const mongoose = require('mongoose');

const PriceSchema = new mongoose.Schema({
    duration: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    }
})

module.exports = PriceSchema