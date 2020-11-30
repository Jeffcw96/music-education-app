import { React, useEffect, useRef } from 'react'
import { getCookie } from './Cookie.js'
import { useHistory } from 'react-router-dom'

export default function Paypal({ color, shape, plan, duration, setPayment }) {
    const history = useHistory()
    const palpalBtn = useRef();
    console.log("paypal duration", duration);

    useEffect(() => {
        //clear the childnode inside the dom before append new one to solve duplicated button issue
        while (palpalBtn.current.firstChild) {
            palpalBtn.current.removeChild(palpalBtn.current.firstChild);
        }
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
                console.log("plan duration", duration);
                // 2. Make a request to your server
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
                        if (res.status === "success") {
                            setPayment("success");
                        } else {
                            setPayment("failed");
                        }

                    })
            },

            onCancel: function (data) {
                setPayment("cancel")
            }
        }, palpalBtn.current);


    }, [duration]);
    return (
        <div>
            <div ref={palpalBtn}></div>
        </div>
    )
}
