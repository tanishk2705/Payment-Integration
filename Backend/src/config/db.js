const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.CONNECTION_URI;
const connectDb = async () => {
        await mongoose.connect(uri);
}
module.exports = connectDb;