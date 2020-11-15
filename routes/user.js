const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");

router.get('/', auth, async (req, res) => {
    try {
        //console.log("user profile req body", req)
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server Error' })
    }
})

router.post('/checkout', auth, async (req, res) => {
    try {
        const purchasePlan = await User.findOneAndUpdate({ _id: req.user.id }, req.body)
        res.send('ok leng');

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server Error' });
    }
})


module.exports = router;