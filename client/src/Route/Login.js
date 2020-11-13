import { React, useState, useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
    const location = useLocation();
    let [rEmail, setREmail] = useState('');

    const email = useRef();
    const password = useRef();
    const emailErrorDesp = useRef();
    const passwordErrorDesp = useRef();

    let [emailError, setEmailError] = useState('');
    let [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        if (location.state !== undefined) {
            console.log("redirect from register", location.state.registeredEmail);
            if (location.state.registeredEmail !== "") {
                setREmail(location.state.registeredEmail);
                email.current.value = rEmail;
            }
        }
    }, [rEmail, location.state])

    async function login() {
        try {

        } catch (err) {
            console.log('error', err);
            const errData = err.response.data;

            console.log("errData", errData);

            for (let error of errData.error) {
                if (error.param === "email") {
                    setEmailError(error.msg);
                    emailErrorDesp.current.classList.add('active');
                } else if (error.param === "password") {
                    setPasswordError(error.msg);
                    passwordErrorDesp.current.classList.add('active');
                }
            }
        }
    }


    return (
        <div className="register-panel">
            <div className="form-container">
                <div className="register-guide">
                    <h2>Welcome to Infimusic</h2>
                    <p>New member?
                    <Link to="/login">Login</Link>
                    </p>
                </div>
                <input type="text" placeholder="Email address" className="form-input" ref={email} />
                <p className="error-message" ref={emailErrorDesp}>{emailError}</p>
                <input type="password" placeholder="New Password" className="form-input" ref={password} />
                <p className="error-message" ref={passwordErrorDesp}>{passwordError}</p>
                <button>Sign In</button>
            </div>
        </div>
    )
}
