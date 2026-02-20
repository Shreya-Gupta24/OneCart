import User from '../model/user.model.js'
export  const getCurrentUser= async(req, res)=>{
    try {
        let user= await User.findById(req.userId).select("-password");
        console.log("getCurrentUser HIT");
        console.log("req.userId:", req.userId);

        if(!user){
            return res.status(404).json({message:"User does not exist"});
        }

        return res.status(200).json({message:"User found successfully", user});
    } catch (error) {
        return res.status(500).json({message:`getCurrentUser: ${error.message}`});
    }
}

export const getAdmin= async(req, res) =>{
    try {
        let adminEmail= req.adminEmail;
        if(!adminEmail){
            return res.status(401).json({message:"User not logged in"});
        }
        return res.status(200).json({message:"Admin found successfully", email: adminEmail, role: "admin"});
    } catch (error) {
        return res.status(500).json({message:`getAdmin: ${error.message}`})
    }
}