import React from 'react'
import { Children } from 'react';

export const authDataContext = React.createContext();
const AuthContext = ({children}) => {
    let serverUrl="https://onecart-5dvv.onrender.com"
    let value={
        serverUrl
    }
  return (
    <div>
        <authDataContext.Provider value={value}>
            {children}
        </authDataContext.Provider>
    </div>
  )
}

export default AuthContext
