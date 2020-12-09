import { React, useRef, useState } from 'react'
import Nav from '../Nav.js'
import axios from 'axios';

export default function ForgotPassword() {
    let [emailStatus, setEmailStatus] = useState(null)
    const email = useRef();

    async function resetPassword() {
        try {
            const jsonBody = {}
            jsonBody.email = email.current.value;
            const response = await axios.post('/user/forgotPassword', jsonBody);
            const result = response.data;

            setEmailStatus(true)

        } catch (error) {
            console.error(error.message);
            setEmailStatus(false)
        }
    }


    return (
        <>
            <Nav />
            <div className="register-panel">
                <div className="form-container">
                    <input type="text" placeholder="Email address" className="form-input" ref={email} />
                    <p className={`success ${emailStatus ? "active" : ""}`}>Please check your email for New Password</p>
                    <p className={`error-message ${emailStatus ? "" : "active"}`}>Invalid Email !</p>
                    <button onClick={resetPassword}>Reset Password</button>
                </div>
            </div>
        </>
    )
}
