import React from 'react'

export default function Profile({ name, email, edit }) {
    return (
        <>
            <p className="profile-interface">Name: {name}</p>
            <p className="profile-interface">Email: {email}</p>
            <div className="user-action-container">
                <button className="profile-interface edit button" onClick={() => { edit(true) }}>Edit Profile</button>
            </div>
        </>
    )
}
