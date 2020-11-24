import { React, useEffect } from 'react'

export default function Paypal() {
    useEffect(() => {
        window.paypal.Button.render({
            env: 'sandbox', // Or 'production'
            // Set up the payment:
            // 1. Add a payment callback

            locale: 'en_US',
            style: {
                size: 'medium',
                color: 'blue',
                shape: 'pill',
                label: 'checkout',
                tagline: 'true'
            },
            payment: function (data, actions) {
                // 2. Make a request to your server
                return actions.request.post('http://localhost:5000/payment/create-payment/')
                    .then(function (res) {
                        // 3. Return res.id from the response
                        return res.id;
                    });
            },
            // Execute the payment:
            // 1. Add an onAuthorize callback
            onAuthorize: function (data, actions) {
                // 2. Make a request to your server
                return actions.request.post('http://localhost:5000/payment/execute-payment/', {
                    paymentID: data.paymentID,
                    payerID: data.payerID
                })
                    .then(function (res) {
                        // 3. Show the buyer a confirmation message.
                    });
            },

            onCancel: function (data) {
                console.log("galaG")
            }
        }, '#paypal-button');


    }, []);
    return (
        <div>
            <h1>Paypal Integration</h1>
            <div id="paypal-button"></div>
        </div>
    )
}
