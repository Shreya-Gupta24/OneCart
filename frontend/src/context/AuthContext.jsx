import React from 'react'
import { createContext } from 'react'

export const authDataContext = createContext();
const AuthContext = ({children}) => {
    let serverUrl="https://onecart-5dvv.onrender.com"
    let value={
        serverUrl
    }
  return (
        <authDataContext.Provider value={value}>
            {children}
        </authDataContext.Provider>
  )
}

export default AuthContext
