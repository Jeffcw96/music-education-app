import {React, useEffect,useState} from 'react'
import axios from 'axios'
import {getCookie} from './Cookie.js'


export default function User() {


    const [user, setUser] = useState({})

    async function getUserInfo(){
        const response = await axios.get('/user',{
            headers: {'Authorization': 'Bearer '+ getCookie('access-token')} 
        })
        const result = response.data;
        setUser(result);
    }


    useEffect(()=>{
        getUserInfo();
    },[])

    console.log("user",user);
    return (
        <div>
            <h1>{user.email}</h1>
        </div>
    )
}
