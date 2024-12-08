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

const User = mongoose.model("User",userSchema);
module.exports = User;