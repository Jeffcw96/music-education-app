import React from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
    return (
        <div className="register-panel">
            <div className="form-container">
                <div className="register-guide">
                    <h2>Create your Account</h2>
                    <p>Already member?
                    <Link to="/login">Login</Link>
                    </p>
                </div>
                <input type="text" placeholder="Full name" className="form-input" />
                <input type="text" placeholder="Email address" className="form-input" />
                <input type="password" placeholder="New Password" className="form-input" />
                <input type="password" placeholder="Confirm Password" className="form-input" />
                <button>Sign Up</button>
            </div>
        </div>
    )
}
