import { React, useEffect } from 'react'
import { getCookie } from './Cookie.js'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export default function Paypal({ color, shape, plan, duration }) {
    const history = useHistory()

    useEffect(() => {
        const accessToken = getCookie('access-token');
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
                const formData = {
                    plan: plan,
                    duration: duration
                };
                if (accessToken) {
                    return actions.request.post('http://localhost:5000/payment/create-payment/', {
                        plan: plan,
                        duration: duration
                    }, {
                        headers: {
                            'Authorization': 'Bearer ' + accessToken
                        }
                    })
                        .then(function (res) {
                            // 3. Return res.id from the response
                            console.log("res", res);
                            return res.id;
                        })

                } else {
                    history.push({
                        pathname: "/login"
                    })
                }
            },
            // Execute the payment:
            // 1. Add an onAuthorize callback
            onAuthorize: function (data, actions) {
                // 2. Make a request to your server
                return actions.request.post('/payment/execute-payment/', {
                    paymentID: data.paymentID,
                    payerID: data.payerID,
                    plan: plan,
                    duration: duration
                }, {
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
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
