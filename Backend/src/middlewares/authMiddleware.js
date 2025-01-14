const jwt = require("jsonwebtoken")
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;



const authMiddleware = (req,res,next) => {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer")){
                return res.status(403).json({message:"Aloo"})
        }
        const token = authHeader.split(" ")[1];

        try{
        const decoded = jwt.verify(token,JWT_SECRET)
        if(!decoded.userId){
                console.log("Decoded Token:", decoded)
                return res.status(403).json({ message: "Invalid token payload" })
        }
        req.userId = decoded.userId
        next();
        }
        catch(err){
                console.error("Token verification error:", err.message)
                return res.status(403).json({message: "Invalid or expired token"})
        }
}

module.exports = {authMiddleware}