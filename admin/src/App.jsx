import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Add from './pages/Add.jsx'
import List from './pages/List.jsx'
import Orders from './pages/Orders.jsx'
import { useContext } from 'react'
import { adminDataContext } from './context/AdminContext.jsx'
import { toast, ToastContainer } from 'react-toastify'

const App = () => {
  let {adminData}=useContext(adminDataContext)
  return (
    <>
    <ToastContainer/>
    {
      !adminData?<Login/>:<>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/add" element={<Add />} />
      <Route path="/lists" element={<List />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
    </>
    }
    </>
  )
}

export default App