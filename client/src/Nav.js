import React from 'react'
import logo from './logo.png'
import './App.css'
import { Link } from 'react-router-dom'

export default function Nav() {

    const noBorder = {
        border: "none",
        fontWeight: "bold"
    }

    return (
        <div className="nav-bar">
            <div className="logo-container">
                <img src={logo} alt="logo" className="logo" />
            </div>
            <ul className="member-container">
                <a href="#Plan" style={noBorder}>
                    <li>Plans</li>
                </a>
                <a href="#Review" style={noBorder}>
                    <li>Review</li>
                </a>
            </ul>
            <ul className="member-container">
                <Link to="/login">
                    <li>Login</li>
                </Link>
                <Link to="/register">
                    <li>Register</li>
                </Link>
            </ul>
        </div>
    )
}

