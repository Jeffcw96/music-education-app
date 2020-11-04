const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
    package: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    features: {
        type: Array,
        required: true
    }

})


module.exports = mongoose.model('plan', PlanSchema);