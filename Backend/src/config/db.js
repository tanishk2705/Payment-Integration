const mongoose = require("mongoose");
const uri = "mongodb+srv://Tanishkgupta:tanishkgupta27052001@paytm-clone.tufvo.mongodb.net/";
const connectDb = async () => {
        await mongoose.connect(uri);
}
module.exports = connectDb;