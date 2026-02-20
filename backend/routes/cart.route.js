import express from "express";
import { addToCart, UpdateCart, getUserCart } from "../controller/cart.controller.js";
import isAuth from "../middleware/isAuth.js";

const cartRoutes= express.Router();

cartRoutes.post("/add", isAuth, addToCart);
cartRoutes.post("/update", isAuth, UpdateCart);
cartRoutes.post("/get", isAuth, getUserCart);

export default cartRoutes