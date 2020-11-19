import React from 'react'

export default function Profile({ name, email }) {
    return (
        <>
            <h1>Account Overview</h1>
            <h2>Profile</h2>
            <p className="profile-interface">Name: {name}</p>
            <p className="profile-interface">Email: {email}</p>
            <div className="user-action-container">
                <button className="profile-interface edit button" onClick={() => this.props.value = true}>Edit Profile</button>
            </div>
        </>
    )
}
