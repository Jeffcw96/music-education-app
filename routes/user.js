const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
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

router.post('/forgotPassword', async (req, res) => {
    let { email } = req.body
    let token = null
    if (email === "") {
        res.status(404).send("Email Not Found");
    }


    try {
        // create reusable transporter object using the default SMTP transport
        const checkEmail = await User.exists({ email: email })
        console.log('checkEmail', checkEmail)
        if (!checkEmail) {
            console.log("faileddd")
            res.status(404).send("invalid email");

        } else {

            const payload = {
                user: {
                    email: email
                }
            }

            token = jwt.sign(
                payload,
                config.get('token'),
                { expiresIn: '900s' });

            console.log('token', token)
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: config.get('EMAIL'), // generated ethereal user
                    pass: config.get('PASSWORD'), // generated ethereal password
                },
            });

            transporter.use('compile', hbs({
                viewEngine: {
                    extname: '.handlebars',
                    layoutsDir: 'views/',
                    defaultLayout: 'view',
                },
                viewPath: './views/'
            }));

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: `Reset Password <${config.get('EMAIL')}>`, // sender address
                to: `${email}`, // list of receivers
                subject: "Reset Password", // Subject line
                text: "Hello world?", // plain text body
                template: "view", // html body
                context: {                  // <=
                    token: token,
                }
            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            res.json({ status: "success" });
        }

    } catch (error) {
        console.error(error.message)
        res.status(404).send("Not Found");
    }
})

router.get('/verifyEmail', auth, async (req, res) => {
    try {
        const checkEmail = await User.exists({ email: req.user.email })

        if (!checkEmail) {
            console.log('email not found');
            res.status(404).send('Email Not Found')
        } else {
            res.json({ email: req.user.email })
        }
    } catch (error) {
        console.error('failed to verify')
        res.status(401).send('Invalid token')
    }
})

router.post('/resetPassword', [[
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })], auth], async (req, res) => {
        try {
            let { password } = req.body;
            const json = {};
            const salt = await bcrypt.genSalt(10);
            json.password = await bcrypt.hash(password, salt);
            const updatePassword = await User.findOneAndUpdate({ email: req.user.email }, json)
            res.json("success");

        } catch (error) {
            console.error('Failed to reset')
            res.status(401).send('Forbiden Access')
        }


    })

module.exports = router;