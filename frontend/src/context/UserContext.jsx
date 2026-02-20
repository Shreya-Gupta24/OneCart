import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import {authDataContext} from './AuthContext';
import { useEffect } from 'react';
import axios from 'axios';

export const userDataContext = React.createContext();
const UserContext = ({children}) => {
    let [userData, setUserData] = useState("")
    let {serverUrl} = useContext(authDataContext)
    const getCurrentUser = async () => {
    try {
        const response = await axios.get(
            serverUrl + "/api/user/getcurrentuser",
            {
                withCredentials: true,
                headers: { "Cache-Control": "no-cache" }
            }
        );

        setUserData(response.data.user);
        console.log(response.data.user);

    } catch (error) {
        console.log("ERROR:", error);
        console.log("ERROR RESPONSE:", error.response);
    }
};

    useEffect(() => {
        getCurrentUser()
    }, [])
    let value= {
        userData,setUserData, getCurrentUser
    }
  return (
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
  )
}

export default UserContext
