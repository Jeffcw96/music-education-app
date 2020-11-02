const { Decimal128, Int32 } = require('bson');
const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
    package: {
        type: String,
        required: true
    },
    price: {
        type: Decimal128,
        required: true
    },
    features: {
        type: Array,
        required: true
    }

})

module.exports = mongoose.model('plan', PlanSchema);