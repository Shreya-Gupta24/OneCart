import express from "express";
import { register, login, logOut, googleLogin, adminLogin } from "../controller/auth.controller.js";

const authRoutes= express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/logout", logOut);
authRoutes.post("/googlelogin", googleLogin);
authRoutes.post("/adminlogin", adminLogin);

export default authRoutes