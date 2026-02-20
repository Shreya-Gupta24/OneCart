import React, { useState, useContext } from 'react'
import Logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'
import google from "../assets/google.png"
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import axios from 'axios';
import { authDataContext } from '../context/AuthContext.jsx';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase.js';
import { userDataContext } from '../context/UserContext.jsx';
import { toast } from 'react-toastify';

const Login = () => {
    const [show, setShow] = useState(false)
    let navigate= useNavigate();
    let [email,setEmail] = useState("")
    let [password,setPassword] = useState("")
    let {serverUrl} = useContext(authDataContext)
    let {setUserData} = useContext(userDataContext)

    const handleLogin= async (e) =>{
        e.preventDefault()
        try {
            const result= await axios.post(serverUrl+"/api/auth/login",{
                email, password
            }, {withCredentials:true})
            console.log(result.data)
            setUserData(result.data.user);
            navigate("/")
            toast.success("Login Successfully")
        } catch (error) {
            console.log(error);
            toast.error("Login Failed")
        }
    }
    const googleLogin= async () =>{
            try {
                const response= await signInWithPopup(auth, provider)
                let user= response.user;
                let name=user.displayName;
                let email= user.email;
    
                const result= await axios.post(serverUrl+"/api/auth/googlelogin",{
                    name, email
                }, {withCredentials:true})
                console.log(result.data)
                setUserData(result.data.user);
                navigate("/")
                toast.success("Login Successfully")
            } catch (error) {
                console.log(error);
                toast.error("Login Failed")
            }
        }
    return (
        <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start'>
            <div className="w-full h-[70px] flex items-center justify-start px-[30px] gap-[10px]" >
                <img className='w-10 cursor-pointer' src={Logo} alt="" onClick={()=> navigate("/")}/>
                <h1 className='text-[22px] cursor-pointer' onClick={()=> navigate("/")}>OneCart</h1>
            </div>
            <div className='w-full h-[50px] flex items-center justify-center flex-col'>
                <span className='text-[25px] font-semibold'>Login</span>
                <span className='text-[16px] mb-8'>Welocome to OneCart, Place Your Order</span>
            </div>
            <div className='max-w-[400px] w-[90%] h-[400px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center'>
                <form action="" onSubmit={handleLogin} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[15px] mt-[20px]'>
                    <div className='w-[90%] h-[40px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer' onClick={googleLogin}>
                        <img src={google} className='w-[20px]' alt="" /> Login with Google 
                    </div>
                    <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px] mt-[10px]' >
                        <div className='w-[40%] h-[1px] bg-[#96969635]'></div> OR <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
                    </div>
                    <div className='w-[90%] h-[250px] flex flex-col items-center justify-center gap-[10px]  relative mt-[1px]'>
                        <input type="text" className='w-[100%] h-[45px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Email' required
                        onChange={(e)=>setEmail(e.target.value)}/>
                        <input type={show?"text":"password"} className='w-[100%] h-[45px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Password' required 
                        onChange={(e)=>setPassword(e.target.value)}/>
                        {!show &&<IoEyeOutline className='w-[18px] h-[18px] cursor-pointer absolute right-[5%] bottom-[57%]' onClick={()=>setShow(prev => !prev)}/>}
                        {show && <IoEye className='w-[18px] h-[18px] cursor-pointer absolute right-[5%] bottom-[57%]' onClick={()=>setShow(prev => !prev)}/>}
                        <button className='w-[100%] h-[45px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold'>Login</button>
                        <p className='flex gap-[10px] text-[15px]'>Dont have an account? <span className='text-[#5555f6cf] text-[15px] font-semibold cursor-pointer' onClick={()=>navigate("/signup")}>Create New Account</span></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
