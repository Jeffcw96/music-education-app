const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const bcrypt = require('bcrypt');

/*route: /user*/

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

router.post('/update', auth, async (req, res) => {
    let { name, password } = req.body
    try {
        const updatedProfile = {}

        if (name !== "" && name !== undefined) {
            updatedProfile.name = name;
        }

        if (password !== "" && password !== undefined) {
            const salt = await bcrypt.genSalt(10);
            updatedProfile.password = await bcrypt.hash(password, salt);
        }
        const updateProfile = await User.findOneAndUpdate({ _id: req.user.id }, updatedProfile)
        res.send('profile successfully updated');

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server Error' });
    }
})

module.exports = router;