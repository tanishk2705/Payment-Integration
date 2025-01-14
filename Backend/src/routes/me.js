const express = require("express")
const  jwt  = require("jsonwebtoken")
const { User } = require("../models/user")
const meRouter = express.Router()
const JWT_SECRET = process.env.JWT_SECRET

meRouter.get('/',async (req,res) => {
        const authHeader = req.headers.authorization
        if(!authHeader || !authHeader.startsWith('Bearer ')){
                return res.status(401).json({
                        valid: false, message: "Invalid authorization header"
                })
        }

        console.log("Authorization header:", authHeader);
        const token = authHeader.split(' ')[1]
        try{
                const decoded = await jwt.verify(token,JWT_SECRET)
                const AccountData = await User.findOne({userId:decoded.userId})
                const userData = await User.findOne({_id:decoded.userId})

                if(!userData || !AccountData){
                        return res.status(404).json({ valid: false, message: "User not found or Account not found" });
                }

               

                res.json({
                        valid:true,
                        balance:AccountData.balance,
                        name:userData.firstName,
                        email:userData.userName
                })
        }
        catch(err){
                console.error("Error verifying token:", err);
                res.status(500).json({ valid: false, message: "Internal server error" });
        }
})

module.exports=meRouter