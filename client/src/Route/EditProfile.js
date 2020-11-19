import { React, useRef } from 'react'

export default function EditProfile({ name, showProfile }) {

    const nameInput = useRef();
    const password = useRef();
    const cPassword = useRef();
    return (
        <>
            <div className="edit-profile name">
                <input type="text" ref={nameInput} />
            </div>
            <div className="edit-profile password">
                <input type="password" ref={password} />
            </div>
            <div className="edit-profile cpassword">
                <input type="password" ref={cPassword} />
            </div>
            <div className="user-action-container">
                <p className="edit-action cancel button" onClick={() => showProfile = false}>Cancel</p>
                <button className="edit-action save button">Save Profile</button>
            </div>
        </>
    )
}
