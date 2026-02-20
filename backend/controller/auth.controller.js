import User from "../model/user.model.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { gentoken, gentoken1 } from "../config/token.js";
export const register = async (req, res) => {
    try{
        const {name, email,password}= req.body;
        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exist"});
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({message:"Please enter a valid email"});
        }
        if(password.length<8){
            return res.status(400).json({message:"Please enter a strong password"});
        }
        let hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name,email,password:hashedPassword});
        let token= await gentoken(user._id);
        res.cookie("token", token, {
            http: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json({message:"User registered successfully", user});
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Something went wrong"});
    }
}

export const login= async(req, res) => {
    try {
        const {email,password}= req.body;
        const user= await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User does not exist"});
        }
        const isMatch= await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:"Incorrect password"});
        }
        let token= await gentoken(user._id);
        res.cookie("token", token, {
            http: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json({message:"User logged in successfully", user});
    } catch (error) {
        return res.status(500).json({message:"Something went wrong"});
    }
}

export const logOut= async(req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({message:"User logged out successfully"});
    } catch (error) {
        return res.status(500).json({message:"Something went wrong"});
    }
}

export const googleLogin= async(req, res) => {
    try {
        let {name, email}= req.body;
        const user= await User.findOne({email});
        if(!user){
            user= await User.create({name,email});
        }
        let token= await gentoken(user._id);
        res.cookie("token", token, {
            http: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json({message:"User logged in successfully", user});
    } catch (error) {
        return res.status(500).json({message:`googleLogin: ${error.message}`});
    }
}

export const adminLogin= async(req, res) => {
    try {
        let {email,password}= req.body;
        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
            return res.status(401).json({message:"Unauthorized"});
        }
        let token= await gentoken1(email);
        res.cookie("token", token, {
            http: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json({message:"Admin logged in successfully"});
    } catch (error) {
        res.status(500).json({message:`adminLogin: ${error.message}`});
    }
}