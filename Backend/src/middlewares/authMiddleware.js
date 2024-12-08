const jwt = require("jsonwebtoken")
const JWT_SECRET = require("../config/config");


const authMiddleware = (req,res,next) => {
        const authHeader = req.headers.authorization;

        if(!authHeader || authHeader.startsWith("Bearer")){
                return res.status(403).json({})
        }
        const token = authHeader.split(' ')[1];

        try{
        const decoded = jwt.verify(token,JWT_SECRET)
        if(!decoded.userId){
                return res.status(403).json({})
        }
        req.userId = decoded.userId
        next();
        }
        catch(err){
                return res.status(403).json({})
        }
}

module.exports = {authMiddleware}