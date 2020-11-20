import { React, useRef, useEffect } from 'react'
import axios from 'axios'

export default function EditProfile({ name, edit, token, updateUserName }) {

    const nameInput = useRef();
    const password = useRef();
    const cPassword = useRef();

    console.log("edit name", name);

    useEffect(() => {
        nameInput.current.value = name
    }, [name])

    async function updateProfile() {
        const profileJson = {};

        if (nameInput.current.value !== name) {
            console.log("nameInput.current.value", nameInput.current.value);
            console.log("name", name);
            profileJson.name = nameInput.current.value
            updateUserName(nameInput.current.value);
        }

        if (password.current.value !== "" || cPassword.current.value !== "") {
            if (password.current.value !== cPassword.current.value) {
                console.log("Password enter not equal");
            } else {
                profileJson.password = cPassword.current.value
            }
        }

        if (Object.keys(profileJson).length !== 0) {
            try {
                const response = await axios.post('/user/update', profileJson, {
                    headers: { "Authorization": "Bearer " + token }
                })

                if (response.status === 200) {
                    edit(false)
                }

            } catch (error) {
                console.error(error.message)
            }

        }
    }
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
                <p className="edit-action cancel button" onClick={() => { edit(false) }}>Cancel</p>
                <button className="edit-action save button" onClick={updateProfile}>Save Profile</button>
            </div>
        </>
    )
}
