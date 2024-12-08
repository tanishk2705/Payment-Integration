const mongoose = require("mongoose");
const {Schema} = mongoose;


/* 
Simple way of creating schema:-
   const userSchema = new Schema({
    firstName : {type : String},
    lastName: {type : String},
    username: {type: String},
    password: {type : String}
})
 */

// Creating user's schema a more elegant way
const userSchema = new Schema({
    firstName : {type : String, required: true, maxLength:50, trim:true},
    lastName: {type : String, required: true, maxLength:50, trim:true},
    userName: {type: String, required: true, trim:true, minLength:3, maxLength:50, lowercase:true, unique:true},
    password: {type : String, required: true, minLength:6}
},{timestamps:true})

const accountSchema = new Schema({
    userId : {type : Schema.Types.ObjectId , ref: "User", required:true} ,
    balance : {type : Number, required:true}
})

const User = mongoose.model("User",userSchema);
const Account = mongoose.model("Account",accountSchema);

module.exports = {User,Account};


/* 
    https://medium.com/@mendes.develop/joining-tables-in-mongodb-with-mongoose-489d72c84b60#:~:text=Just%20like%20SQL%20databases%2C%20MongoDB,other%20collections%20by%20reference%20IDs.
 */


    /*  
      Difference between Document and Model */