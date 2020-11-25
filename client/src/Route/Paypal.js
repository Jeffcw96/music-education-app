import { React, useEffect } from 'react'

export default function Paypal({color,shape}) {
    useEffect(() => {
        
        window.paypal.Button.render({
            env: 'sandbox', // Or 'production'
            // Set up the payment:
            // 1. Add a payment callback

            locale: 'en_US',
            style: {
                size: 'small',
                color: color,
                shape: shape,
                label: 'checkout',
                tagline: 'false'
            },
            payment: function (data, actions) {
                // 2. Make a request to your server
                return actions.request.post('/payment/create-payment/')
                    .then(function (res) {
                        // 3. Return res.id from the response
                        return res.id;
                    });
            },
            // Execute the payment:
            // 1. Add an onAuthorize callback
            onAuthorize: function (data, actions) {
                // 2. Make a request to your server
                return actions.request.post('/payment/execute-payment/', {
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
            <div id="paypal-button"></div>
        </div>
    )
}
