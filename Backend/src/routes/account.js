const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { Account, Account } = require("../models/user");
const accountRouter = express.Router();
const mongoose = require("mongoose");


accountRouter.get("/balance",authMiddleware,async (req,res)=>{
        const account = await Account.findOne({ userId: req.userId})
        res.json({
              "balance" : account.balance
        })
})

accountRouter.post("/transfer",authMiddleware,async (req,res)=>{
     const session = await mongoose.startSession();
     session.startTransaction();

     //Fetch the accounts within the transaction
     const account = await Account.findOne({userId:req.userId}).session(session);

     if(!account || account.balance<req.body.amount){
        await session.abortTransaction()
        return res.status(400).json({
                message : "Insufficient Balance"
        })
     }

     if(!req.body.to){
        return res.status(400).json({
                message : "Invalid account"
        })
     }

        //Perform The transfer
        await Account.updateOne({userId:req.userId}, {$inc : {balance: -req.body.amount}}).session(session);
        await Account.updateOne({userId: req.body.to}, {$inc : { balance: req.body.amount}}).session(session);

        // Commit to the transaction
        await session.commitTransaction();

        res.status(200).json({
                message : "Transfer succesful"
        })
})


module.exports = accountRouter;



/* 
https://levelup.gitconnected.com/mongodb-transaction-error-due-to-missing-replica-set-resolved-7b2a7a59edb1
https://stackoverflow.com/questions/51461952/mongodb-v4-0-transaction-mongoerror-transaction-numbers-are-only-allowed-on-a
*/