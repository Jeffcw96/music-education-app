import { React, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

export default function Register() {
    const fullName = useRef();
    const email = useRef();
    const password = useRef();
    const cPassword = useRef();

    let [nameError, setNameError] = useState('');
    let [emailError, setEmailError] = useState('');
    let [passwordError, setPasswordError] = useState('');
    const fetchOptions = {
        method: "POST",
        header: new Headers({
            "Content-Type": "application/json",
        }),
        mode: "cors"
    }

    function registration() {
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



            axios
                .post('http://localhost:5000/auth', jsonBody)
                .then(() => console.log('Book Created'))
                .catch(err => {
                    console.error(err);
                });

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
                <p>{nameError}</p>
                <input type="text" placeholder="Email address" className="form-input" ref={email} />
                <p>{emailError}</p>
                <input type="password" placeholder="New Password" className="form-input" ref={password} />
                <p>{passwordError}</p>
                <input type="password" placeholder="Confirm Password" className="form-input" ref={cPassword} />
                <button onClick={registration}>Sign Up</button>
            </div>
        </div>
    )
}
