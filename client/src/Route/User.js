import { React, useEffect, useState } from 'react'
import axios from 'axios'
import { getCookie } from './Cookie.js'
import { useHistory, useLocation } from 'react-router-dom'
import Nav from '../Nav.js'

export default function User() {
    let history = useHistory();
    const [user, setUser] = useState({})

    async function getUserInfo() {
        try {
            const response = await axios.get('/user', {
                headers: { 'Authorization': 'Bearer ' + getCookie('access-token') }
            })
            const result = response.data;
            setUser(result);
        } catch (error) {
            console.error(error);
            let status = error.response.status;

            if (status >= 400 && status <= 500) {
                history.push({
                    pathname: '/login'
                })
            }
        }
    }

    useEffect(() => {
        getUserInfo();
    }, [])

    console.log("user", user);
    return (
        <>
            <Nav />
            <div className="user-page">
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Subscription: {user.subscription} <span>Upgrade your subscription here</span></p>
            </div>
        </>
    )
}
