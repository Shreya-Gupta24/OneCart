import React from 'react'
import { Children } from 'react';

export const authDataContext = React.createContext();
const AuthContext = ({children}) => {
    let serverUrl="http://localhost:3000"
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