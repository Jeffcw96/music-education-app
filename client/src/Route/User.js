import { React, useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { getCookie } from './Cookie.js'
import { Link, useHistory } from 'react-router-dom'
import Nav from '../Nav.js'
import EditProfile from './EditProfile.js'
import Profile from './Profile.js'

export default function User() {
    let history = useHistory();
    let [user, setUser] = useState({})
    let [profile, setProfile] = useState(false)
    const show = true


    function editProfile() {

    }

    async function getUserInfo() {
        try {
            const response = await axios.get('http://localhost:5000/user', {
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
    return (
        <>
            <Nav />
            <div className="user-container">
                <div className="user-page">
                    {profile ? <Profile name={user.name} email={user.email} onClick={value => setProfile(value)} /> : <EditProfile name={user.name} showProfile={show} onClick={() => setProfile(!show)} />}
                    <p className="subscription-header">Subscription</p>
                    <div className="subscription-container">
                        <div className="plan">
                            <div>{user.subscription}</div>
                        </div>
                        <div className="upgrade">
                            <Link to="/#Plan">
                                Upgrade Now
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
