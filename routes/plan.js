const express = require('express');
const router = express.Router();
const Plans = require('../models/Plan');

router.get('/', async (req, res) => {
    try {
        const plans = await Plans.find();
        console.log("plans", plans)
        return res.json(plans)
    } catch (error) {
        console.error("error in getting plans", error.message);
        res.status(500).send("Server Error");
    }

})

module.exports = router;