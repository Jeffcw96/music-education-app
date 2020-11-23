const express = require('express');
const router = express.Router();
const Plans = require('../models/Plan');
const Price = require("../models/Price");
const mongoose = require('mongoose');

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


router.get('/package', async (req, res) => {
    try {
        let userPlan = req.query.q;
        console.log("userPlan", userPlan);
        const SelectedPlan = mongoose.model(userPlan, Price)
        const planDetails = await SelectedPlan.find();
        res.json(planDetails);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

module.exports = router;