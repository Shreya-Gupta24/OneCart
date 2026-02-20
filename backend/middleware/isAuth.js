import jwt from "jsonwebtoken";
const isAuth= async (req, res, next) => {
    try {
        let {token} = req.cookies;
        if(!token){
            return res.status(401).json({message:"User not logged in"});
        }
        let verifyToken= jwt.verify(token, process.env.JWT_SECRET)
        if(!verifyToken){
            return res.status(401).json({message:"User does not have valid token"});
        }
        console.log("Decoded token:", verifyToken);
        req.userId= verifyToken.userId;
        next();
    } catch (error) {
        return res.status(500).json({message:`isAuth: ${error.message}`});
    }
}
export default isAuth