const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const config = require('config');
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

    try {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.get('EMAIL'), // generated ethereal user
                pass: config.get('PASSWORD'), // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: `Test email From <${config.get('EMAIL')}>`, // sender address
            to: `${email}`, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        res.send("success");
    } catch (error) {
        console.error(error.message)
        res.status(404).send("Not Found");
    }



})

module.exports = router;