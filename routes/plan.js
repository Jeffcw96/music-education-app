const express = require('express');
const router = express.Router();
const Plans = require('../models/Plan');

// Path: /plan
// Access: Public 

router.get('/', async (req, res) => {
    try {
        const plans = await Plans.find();
        return res.json(plans)
    } catch (error) {
        console.error("error in getting plans", error.message);
        res.status(500).send("Server Error");
    }
})

module.exports = router;