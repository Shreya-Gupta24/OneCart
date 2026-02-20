import React, { useState, useContext } from 'react'
import Logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'
import google from "../assets/google.png"
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { authDataContext } from '../context/AuthContext.jsx';
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase.js';
import { userDataContext } from '../context/UserContext.jsx';
import { toast } from 'react-toastify';

const Registration = () => {
    const [show, setShow] = useState(false)
    let navigate= useNavigate();
    let {serverUrl} = useContext(authDataContext)
    let [name,setName] = useState("")
    let [email,setEmail] = useState("")
    let [password,setPassword] = useState("")
    let {setUserData} = useContext(userDataContext)
    const handleSignUp = async (e) =>{
        e.preventDefault()
        try {
            const result= await axios.post(serverUrl+"/api/auth/register",{
                name, email, password
            }, {withCredentials:true})
            console.log(result.data)
            setUserData(result.data.user)
            console.log("navigating to /");
            navigate("/")
            toast.success("Registered Successfully")
        } catch (error) {
            console.log(error);
            toast.error("Registration Failed")
        }
    }

    const googleSignUp= async () =>{
        try {
            const response= await signInWithPopup(auth, provider)
            let user= response.user;
            let name=user.displayName;
            let email= user.email;

            const result= await axios.post(serverUrl+"/api/auth/googlelogin",{
                name, email
            }, {withCredentials:true})
            console.log(result.data)
            setUserData(result.data.user)
            console.log("navigating to /");
            navigate("/")
            toast.success("Login Successfully")
        } catch (error) {
            console.log(error);
            toast.error("Login Failed")
        }
    }
    return (
        <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start'>
            <div className="w-full h-[70px] flex items-center justify-start px-[30px] gap-[10px]">
                <img className='w-10 cursor-pointer' src={Logo} alt="" onClick={()=> navigate("/")}/>
                <h1 className='text-[22px] cursor-pointer' onClick={()=> navigate("/")}>OneCart</h1>
            </div>
            <div className='w-full h-[50px] flex items-center justify-center flex-col'>
                <span className='text-[25px] font-semibold'>Registration</span>
                <span className='text-[16px] mb-8'>Welocm to OneCart, Place Your Order</span>
            </div>
            <div className='max-w-[400px] w-[90%] h-[400px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center'>
                <form action="" onSubmit={handleSignUp} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[15px] mt-[15px]'>
                    <div className='w-[90%] h-[40px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer' onClick={googleSignUp}>
                        <img src={google} className='w-[20px]' alt="" /> Registration with Google 
                    </div>
                    <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px]' >
                        <div className='w-[40%] h-[1px] bg-[#96969635]'></div> OR <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
                    </div>
                    <div className='w-[90%] h-[250px] flex flex-col items-center justify-center gap-[10px]  relative'>
                        <input type="text" className='w-[100%] h-[45px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='UserName' required
                        onChange={(e)=> setName(e.target.value)} value={name}/>
                        <input type="text" className='w-[100%] h-[45px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Email' required
                        onChange={(e)=> setEmail(e.target.value)} value={email}/>
                        <input type={show?"text":"password"} className='w-[100%] h-[45px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Password' required
                        onChange={(e)=> setPassword(e.target.value)} value={password}/>
                        {!show &&<IoEyeOutline className='w-[18px] h-[18px] cursor-pointer absolute right-[5%]' onClick={()=>setShow(prev => !prev)}/>}
                        {show && <IoEye className='w-[18px] h-[18px] cursor-pointer absolute right-[5%]' onClick={()=>setShow(prev => !prev)}/>}
                        <button className='w-[100%] h-[45px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold'>Create Account</button>
                        <p className='flex gap-[10px] text-[15px]'>Already have an account? <span className='text-[#5555f6cf] text-[15px] font-semibold cursor-pointer' onClick={()=>navigate("/login")}>Login</span></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Registration
