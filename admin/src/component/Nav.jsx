import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../assets/logo.png"
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { adminDataContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

function Nav() {
    let navigate = useNavigate()
    let {serverUrl} = useContext(authDataContext)
    let {getAdmin} = useContext(adminDataContext)

    const logOut = async () => {
        try {
            const result = await axios.get(serverUrl + "/api/auth/logout", {withCredentials:true})
            console.log(result.data)
            toast.success("LogOut Successfully")
            getAdmin()
            navigate("/login")

        } catch (error) {
            console.log(error)
            toast.error("LogOut Failed")
        }
        
    }
  return (
    <div className='w-[100vw] h-[50px] bg-[#00000025] bg-black/10 backdrop-blur-lg border border-black/20 shadow-2xl z-10 fixed top-0 flex  items-center justify-between px-[30px] shadow-md shadow-black-700'>
        <div className='w-[30%]  flex items-center justify-start  gap-[5px] cursor-pointer ' onClick={()=>navigate("/")}>
        <img src={logo} alt=""  className='w-[25px]'/>
        <h1 className='text-[20px] text-[white] font-sans '>OneCart</h1>

       


        </div>
         <button className='text-[15px] text-black font-bold hover:bg-slate-400 cursor-pointer bg-[#cbcbcbc9] py-[5px] px-[15px] rounded-2xl' onClick={logOut}>LogOut</button>
      
    </div>
  )
}

export default Nav
