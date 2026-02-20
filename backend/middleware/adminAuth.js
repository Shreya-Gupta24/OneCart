import jwt from "jsonwebtoken";

const adminAuth= async (req, res, next) => {
    try {
        let {token} = req.cookies;
        if(!token){
            return res.status(401).json({message:"User not logged in"});
        }
        let verifyToken= jwt.verify(token, process.env.JWT_SECRET)
        if(!verifyToken){
            return res.status(401).json({message:"User does not have valid token"});
        }
        req.adminEmail=process.env.ADMIN_EMAIL;
        next();
    } catch (error) {
        return res.status(500).json({message:`adminAuth: ${error.message}`})
    }
}

export default adminAuth