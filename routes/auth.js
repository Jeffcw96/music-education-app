const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const User = require("../models/User");

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })],
    async (req, res) => {
        const errors = validationResult(req);
        console.log("register user");
        console.log(req.body)
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() })
        }

        const { name, email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ error: [{ msg: 'User already exist', param: 'userExist' }] })
            }

            const userField = {};
            userField.name = name;
            userField.email = email;

            const salt = await bcrypt.genSalt(10);
            userField.password = await bcrypt.hash(password, salt);

            user = new User(userField);

            await user.save();

            // const payload = {
            //     user: {
            //         id: user.id
            //     }
            // }

            // jwt.sign(
            //     payload,
            //     config.get('token'),
            //     { expiresIn: 360000 },
            //     (err, token) => {
            //         if (err) throw (err);
            //         res.json({ token })
            //     });

            res.json({ registeredEmail: email, redirect: true });

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error')
        }
    })


router.post("/login", [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({ error: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(400).json({ error: "Invalid Credentials" });
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            config.get('token'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw (err);
                res.json({ token })
            });


    } catch (error) {
        console.error(error.message)
        res.status(500).json({ errors: "Server Error" })
    }



})







module.exports = router;