import { React, useRef, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { setCookie, getCookie } from './Cookie'
import Nav from '../Nav.js';
import Footer from '../Footer';
import axios from 'axios';

export default function ResetPassword() {
    let [invalid, setInvalid] = useState(false)
    let [passwordError, setPasswordError] = useState('')
    let [resetError, setResetError] = useState(false)
    let [success, setSuccess] = useState(false)
    let [email, setEmail] = useState('')
    const password = useRef();
    const confirmPassword = useRef();
    const history = useHistory();
    async function veriryUser() {
        try {
            let query = (new URL(document.location)).searchParams;
            let token = query.get("token");

            console.log('token query', query.get("token"))

            let response = await axios.get('/user/verifyEmail', {
                headers: { 'Authorization': 'Bearer ' + token }
            })

            if (response.status === 200) {
                setEmail(response.data.email);
                setCookie('resetToken', token, 1);
                setInvalid(false);
            }

        } catch (error) {
            setInvalid(true);
        }
    }

    async function resetPassword() {
        try {
            if (password.current.value === confirmPassword.current.value) {

                const json = {}
                json.password = confirmPassword.current.value

                let response = await axios.post("/user/resetPassword", json, {
                    headers: { 'Authorization': 'Bearer ' + getCookie('resetToken') }
                })
                if (response.status === 200) {
                    setResetError(false);
                    setSuccess(true)
                    setTimeout(() => {
                        history.push({
                            pathname: '/login',
                        })
                    }, 3000);
                }
            }

        } catch (error) {
            setPasswordError(error.response.data)
            setResetError(true);
        }
    }

    useEffect(() => {
        veriryUser()
    }, [])




    return (
        <>
            <Nav />
            <div className="register-panel">
                <div className="form-container">
                    <div className="register-guide">
                        <h2>Reset Password</h2>
                    </div>
                    <input type="text" placeholder={email} className="form-input" disabled />
                    <input type="password" placeholder="New Password" className="form-input" ref={password} />
                    <p className={`error-message ${resetError ? "active" : null}`} >{passwordError}</p>
                    <input type="password" placeholder="Confirm Password" className="form-input" ref={confirmPassword} />
                    <p className={`error-message ${resetError ? "active" : null}`} >{passwordError}</p>
                    <button onClick={resetPassword} disabled={invalid}>Submit</button>
                    <p className={`error-message ${invalid ? "active" : null}`}>Session Expired</p>
                    <p className={`success ${success ? "active" : null}`}>Success !! You will be navigate to Login Page in few seconds</p>
                </div>
            </div>
            <Footer />
        </>
    )
}
