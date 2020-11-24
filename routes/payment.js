const express = require('express');
const request = require('request');
const router = express.Router();

const CLIENT = 'AWlRSVeukdcjOodTkphIYzB6gHodJUtPXClR0v8TUtDKePv9aC6FSNCuD3O53zFsY-8D8x6u65gNHtmT';
const SECRET = 'EHG4mWFegOixuGq6va4OjoaprMd0y0LIyPpnumYjWOpzpnhIfYsDnmGPi_ICZDTyx6yxthUJI7v5FW5m';
const PAYPAL_API = 'https://api-m.sandbox.paypal.com';

router.post('/create-payment', (req, res) => {
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
                            total: '5.99',
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
                    id: response.body.id
                });
        });
})

router.post('/execute-payment', (req, res) => {
    // 2. Get the payment ID and the payer ID from the request body.
    var paymentID = req.body.paymentID;
    var payerID = req.body.payerID;
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
                            total: '10.99',
                            currency: 'USD'
                        }
                    }]
            },
            json: true
        },
        function (err, response) {
            if (err) {
                console.error(err);
                return res.sendStatus(500);
            }
            console.log("success")
            // 4. Return a success response to the client
            res.json(
                {
                    status: 'success'
                });
        });

})

module.exports = router;