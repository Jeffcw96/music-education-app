const express = require('express');
const request = require('request');
const router = express.Router();
const auth = require('../middleware/auth');
const PriceSchema = require('../models/Price');
const User = require('../models/User');
const mongoose = require('mongoose');
const config = require('config');

const CLIENT = config.get('CLIENT');
const SECRET = config.get('SECRET');
const PAYPAL_API = config.get('PAYPAL_API');

router.post('/create-payment', auth, async (req, res) => {
    const { plan, duration } = req.body;
    const SelectedPlan = mongoose.model(plan.toLowerCase(), PriceSchema);
    const planDetails = await SelectedPlan.findOne({ duration: duration }).exec();
    console.log("plan Details", planDetails)
    request.post(PAYPAL_API + '/v1/payments/payment',
        {
            auth:
            {
                user: CLIENT,
                pass: SECRET
            },
            body:
            {
                intent: 'sale',
                payer:
                {
                    payment_method: 'paypal'
                },
                transactions: [
                    {
                        amount:
                        {
                            total: planDetails.price,
                            currency: 'MYR'
                        }
                    }],
                redirect_urls:
                {
                    return_url: 'https://example.com',
                    cancel_url: 'https://example.com'
                }
            },
            json: true
        }, function (err, response) {
            if (err) {
                console.error(err);
                return res.sendStatus(500);
            }

            // 3. Return the payment ID to the client
            res.json(
                {
                    id: response.body.id,
                    price: planDetails.price
                });
        });
})

router.post('/execute-payment', auth, async (req, res) => {
    // 2. Get the payment ID and the payer ID from the request body.
    const { paymentID, payerID, plan, duration } = req.body;
    const SelectedPlan = mongoose.model(plan.toLowerCase(), PriceSchema);
    const planDetails = await SelectedPlan.findOne({ duration: duration }).exec();
    // 3. Call /v1/payments/payment/PAY-XXX/execute to finalize the payment.
    request.post(PAYPAL_API + '/v1/payments/payment/' + paymentID +
        '/execute',
        {
            auth:
            {
                user: CLIENT,
                pass: SECRET
            },
            body:
            {
                payer_id: payerID,
                transactions: [
                    {
                        amount:
                        {
                            total: planDetails.price,
                            currency: 'MYR'
                        }
                    }]
            },
            json: true
        },
        async function (err, response) {
            try {
                if (err) {
                    console.error(err);
                    return res.sendStatus(500);
                }
                console.log(" payment success");
                const updatedPlan = {};
                let durationPeriod = null

                if (duration === '1') {
                    durationPeriod = 'individual';
                } else {
                    durationPeriod = duration + " month";
                }
                updatedPlan.subscription = plan + " " + durationPeriod
                const updateUserPlan = await User.findOneAndUpdate({ _id: req.user.id }, updatedPlan)
                // 4. Return a success response to the client
                res.json(
                    {
                        status: 'success'
                    });
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Server Error")
            }

        });

})

module.exports = router;