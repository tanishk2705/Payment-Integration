const express = require("express");
const userRouter = express.Router();
const {z} = require("zod");
const {User,Account} = require("../models/user");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config/config");
const bcrypt = require("bcrypt")
const saltRounds = 10;
const {authMiddleware} = require("../middlewares/authMiddleware")

const signupSchema = z.object({
    firstName : z.string(),
    lastName : z.string(),
    userName : z.string().email(),
    password:  z.string()
    
}) 

userRouter.post("/signup",async (req,res)=>{
      const parsed = signupSchema.safeParse(req.body);
      if(!parsed.success){
         res.status(411).json({
                message:"Invalid Input",
                errors: parsed.error.issues,
         })
      }

      const existingUser = await User.findOne({
         userName: req.body.userName
      })

      if(existingUser){
        res.status(411).json({
                message:"User already exist"
         })
      }

      const hashPassword = await bcrypt.hash(req.body.password, saltRounds);

      const user = await User.create({
        firstName : req.body.firstName,
        lastName: req.body.lastName,
        userName : req.body.userName,
        password : hashPassword
      })

      await Account.create({
         userId : user._id,
         balance : 1 + Math.random()*10000
      })

      const token = jwt.sign({userId:user._id}, JWT_SECRET ,{ expiresIn: '1h' })
      res.json({
        message : "User created successfully",
        token : token,
      })


})


const signinSchema = z.object({
        userName : z.string().email(),
        password:  z.string()
})

userRouter.post("/signin",async (req,res) => {
   const parsed = signinSchema.safeParse(req.body);
   if(!parsed.success){
      res.status(411).json({
             message:"Invalid Input",
             errors: parsed.error.issues,
      })
   }

      const user = await User.findOne({
        userName:req.body.userName
       });

      if(!user._id){
        res.status(411).json({
               message: "User not found"
        })
     }


      const match = await bcrypt.compare(req.body.password,user.password);
      if(!match){
        res.status(411).json({
                message: "Password is incorrect"
         })
      }

      const token = jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:"1d"})

      res.json({
        message : "Logged in succesfully",
        token : token
      })
})

const updateBody = z.object({
  password : z.string().optional(),
  firstName : z.string().optional(),
  userName: z.string().optional()
})

userRouter.put("/",authMiddleware,async (req,res) =>{
  try{
     const parsed = updateBody.safeParse(req.body);
     if(!parsed.success){
      throw new Error("Invalid Input")
     }

      await User.updateOne(req.body,{
         _id : req.userId
      })

      res.json({
         message : "Update Succesfully"
      })
  }
     catch(err){
           res.status(411).json({
               message : `ERROR: ${err.message}`
           })
     }
    

})


userRouter.get("/bulk",async (req,res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or : [{
            firstName : {
                 "$regex" : filter
            }
          },
          {
            lastName : {
               "$regex" : filter
            }
          }]
    })

    res.json({
      users : users.map(user => ({
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        _id:user.user._id
     }))
    }) 

})

module.exports = userRouter;




/* 
https://stackoverflow.com/questions/7382207/mongooses-find-method-with-or-condition-does-not-work-properly
https://stackoverflow.com/questions/3305561/how-to-query-mongodb-with-like */