import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import cors from "cors"
import userRoutes from "./routes/user.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import orderRoutes from "./routes/order.route.js"
dotenv.config();

let port=process.env.PORT || 3000;

let app= express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}))
app.use((req, res, next) => {
  const originalStatus = res.status;
  res.status = function (code) {
    console.log("STATUS SENT FROM BACKEND:", code);
    return originalStatus.call(this, code);
  };
  next();
});


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/order", orderRoutes)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
    connectDB();
});
