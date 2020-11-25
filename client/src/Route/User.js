import { React, useEffect, useState } from 'react'
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


    function editProfile(action) {
        setProfile(action)
    }

    function updateUserName(name) {
        setUser(curr => { return { ...curr, name } })
    }

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
    return (
        <>
            <Nav />
            <div className="user-container">
                <div className="user-page">
                    <h1>Account Overview</h1>
                    <h2>Profile</h2>
                    {profile ? <EditProfile name={user.name} edit={editProfile} token={getCookie('access-token')} updateUserName={updateUserName} /> : <Profile name={user.name} email={user.email} edit={editProfile} />}
                    <div className="subscription-header">
                        <p>Subscription</p>
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

            </div>
        </>
    )
}
