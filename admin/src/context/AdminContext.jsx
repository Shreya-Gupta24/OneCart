import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { authDataContext } from './AuthContext.jsx'
import { useEffect } from 'react';
import axios from 'axios';

export const adminDataContext = React.createContext();
const AdminContext = ({children}) => {
    let {serverUrl}=useContext(authDataContext)
    const [adminData, setAdminData] = useState(null)
    const getAdmin=async()=>{
        try {
            const response = await axios.get(serverUrl+"/api/user/getadmin", {withCredentials:true})
            setAdminData(response.data)
            console.log(response.data)
        } catch (error) {
            setAdminData(null)
            console.log("ERROR:", error);
            console.log("ERROR RESPONSE:", error.response);
        }
    }
    useEffect(()=>{
        getAdmin()
    },[])
    let value={getAdmin, adminData, setAdminData}
  return (
    <div>
        <adminDataContext.Provider value={value}>
            {children}
        </adminDataContext.Provider>
    </div>
  )
}

export default AdminContext