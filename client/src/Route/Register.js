import { React, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';

export default function Register() {
    const fullName = useRef();
    const email = useRef();
    const password = useRef();
    const cPassword = useRef();
    const nameErrorDesp = useRef();
    const emailErrorDesp = useRef();
    const passwordErrorDesp = useRef();
    const userExistError = useRef();

    let [nameError, setNameError] = useState('');
    let [emailError, setEmailError] = useState('');
    let [passwordError, setPasswordError] = useState('');
    let [existError, setExistError] = useState('');

    const history = useHistory();

    function redirect(result) {
        console.log("redirectData.redirect", result.redirect);
        if (result.redirect) {
            console.log("going to redirect");
            history.push({
                pathname: '/login',
                state: { registeredEmail: result.registeredEmail }
            })
        }
    }

    async function registration() {
        try {
            const pDom = password.current;
            const cpDom = cPassword.current

            const jsonBody = {}
            jsonBody.email = email.current.value;
            jsonBody.name = fullName.current.value;

            if (pDom.value !== cpDom.value) {
                pDom.classList.add("error-input");
                cpDom.classList.add("error-input");
            } else {
                jsonBody.password = cpDom.value;

                pDom.classList.remove("error-input");
                cpDom.classList.remove("error-input");

                const response = await axios.post('http://localhost:5000/auth', jsonBody);
                const result = response.data;

                redirect(result);

            }
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
                } else if (error.param === "name") {
                    setNameError(error.msg);
                    nameErrorDesp.current.classList.add('active');
                } else if (error.param === "userExist") {
                    setExistError(error.msg);
                    userExistError.current.classList.add('active');
                }
            }
        }
    }


    return (
        <div className="register-panel">
            <div className="form-container">
                <div className="register-guide">
                    <h2>Create your Account</h2>
                    <p>Already member?
                    <Link to="/login">Login</Link>
                    </p>
                </div>
                <input type="text" placeholder="Full name" className="form-input" ref={fullName} />
                <p className="error-message" ref={nameErrorDesp}>{nameError}</p>
                <input type="text" placeholder="Email address" className="form-input" ref={email} />
                <p className="error-message" ref={emailErrorDesp}>{emailError}</p>
                <input type="password" placeholder="New Password" className="form-input" ref={password} />
                <p className="error-message" ref={passwordErrorDesp}>{passwordError}</p>
                <input type="password" placeholder="Confirm Password" className="form-input" ref={cPassword} />
                <p className="error-message" ref={userExistError}>{existError}</p>
                <button onClick={registration}>Sign Up</button>
            </div>
        </div>
    )
}
