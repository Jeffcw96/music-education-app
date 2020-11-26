const express = require('express');
const request = require('request');
const router = express.Router();
const auth = require('../middleware/auth');
const PriceSchema = require('../models/Price');
const User = require('../models/User');
const mongoose = require('mongoose');

const CLIENT = 'AWlRSVeukdcjOodTkphIYzB6gHodJUtPXClR0v8TUtDKePv9aC6FSNCuD3O53zFsY-8D8x6u65gNHtmT';
const SECRET = 'EHG4mWFegOixuGq6va4OjoaprMd0y0LIyPpnumYjWOpzpnhIfYsDnmGPi_ICZDTyx6yxthUJI7v5FW5m';
const PAYPAL_API = 'https://api-m.sandbox.paypal.com';

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
            console.log("create payment response", response.body)
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
            if (err) {
                console.error(err);
                return res.sendStatus(500);
            }
            console.log("success");
            const updatedPlan = {};
            updatedPlan.subscription = plan + " " + duration + " month"
            const updateUserPlan = await User.findOneAndUpdate({ _id: req.user.id }, updatedPlan)
            // 4. Return a success response to the client
            res.json(
                {
                    status: 'success'
                });
        });

})

module.exports = router;