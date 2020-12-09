import { React, useEffect, useState } from 'react'
import logo from './logo.png'
import './App.css'
import { Link, useHistory } from 'react-router-dom'
import { getCookie, deleteCookie } from './Route/Cookie.js'

export default function Nav() {
    const history = useHistory()
    const noBorder = {
        border: "none",
        fontWeight: "bold"
    }

    let [isLogin, setLogin] = useState(false)

    function UserLogout() {
        return (
            <>
                <Link to="/login">
                    <li>Login</li>
                </Link>
                <Link to="/register">
                    <li>Register</li>
                </Link>
            </>
        )
    }

    function UserLogin() {
        return (
            <>
                <Link to="/user">
                    <li>User</li>
                </Link>
                <a onClick={Logout} href="#">
                    <li>Logout</li>
                </a>
            </>
        )
    }

    function Logout(e) {
        e.preventDefault();
        setLogin(false);
        deleteCookie("access-token");
        history.push({
            pathname: "/"
        })
    }

    useEffect(() => {
        const token = getCookie("access-token");
        if (token.length !== 0 && token.length !== "") {
            setLogin(true);
        }
    }, [])

    return (
        <div className="nav-bar">
            <div className="logo-container">
                <Link to="/">
                    <img src={logo} alt="logo" className="logo" />
                </Link>
            </div>
            <ul className="member-container">
                <a href="/#feature" style={noBorder}>
                    <li>Feature</li>
                </a>
                <a href="/#Plan" style={noBorder}>
                    <li>Plans</li>
                </a>

            </ul>
            <ul className="member-container">
                {isLogin ? UserLogin() : UserLogout()}
            </ul>
        </div>
    )
}

