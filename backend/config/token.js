import jwt from "jsonwebtoken";

export const gentoken= async (id) => {
    try {
        let token= await jwt.sign({userId: id}, process.env.JWT_SECRET, {expiresIn: "7d"})
        return token
    } catch (error) {
        console.log(error);
    }
};

export const gentoken1= async (email) => {
    try {
        let token= await jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: "7d"})
        return token
    } catch (error) {
        console.log(error);
    }
};