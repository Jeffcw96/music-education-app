import { React, useState, useEffect, useRef } from 'react'
import { useLocation, Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { setCookie } from './Cookie.js'
import Nav from '../Nav.js'

export default function Login() {
    const TOKEN = {
        EXPIRATION: 7
    }

    const history = useHistory();

    const location = useLocation();
    let [rEmail, setREmail] = useState('');

    const email = useRef();
    const password = useRef();
    const LoginErrorDesp = useRef();

    let [loginError, setloginError] = useState('');

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
            const jsonBody = {}
            jsonBody.email = email.current.value;
            jsonBody.password = password.current.value;
            const response = await axios.post('http://localhost:5000/auth/login', jsonBody);
            const result = response.data;
            setloginError('');
            LoginErrorDesp.current.classList.remove("active");

            if (result.token !== "") {
                let d = new Date();
                d.setTime(d.getTime() + (TOKEN.EXPIRATION * 24 * 60 * 60 * 1000));
                console.log("date", d.toUTCString());
                setCookie("access-token", result.token, 7);
                history.push({
                    pathname: "/user",
                    state: { isLogin: true }
                })
            }

        } catch (err) {

            const errData = err.response.data;

            if (errData === "Invalid Credentials" || err.response.status === 400) {
                setloginError('Incorrect Email or Password');
                LoginErrorDesp.current.classList.add("active");
            }
        }
    }


    return (
        <>
            <Nav />
            <div className="register-panel">
                <div className="form-container">
                    <div className="register-guide">
                        <h2>Welcome to Infimusic</h2>
                        <p>New member?
                    <Link to="/register">Register</Link>
                        </p>
                    </div>
                    <input type="text" placeholder="Email address" className="form-input" ref={email} />
                    <input type="password" placeholder="New Password" className="form-input" ref={password} />
                    <p className="error-message" ref={LoginErrorDesp}>{loginError}</p>
                    <button onClick={login}>Sign In</button>
                </div>
            </div>
        </>
    )
}
