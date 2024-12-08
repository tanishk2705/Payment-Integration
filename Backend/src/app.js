const express = require("express");
const connectDb = require("./config/db");
const mainRouter = require("./routes/index");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());  // body-parser
app.use("/api/v1",mainRouter);



connectDb()
 .then(()=>{
        console.log("Database is connected succesfully");
        app.listen(PORT, () => console.log(`Server is listening at PORT: ${PORT}`));
 })
 .catch(err => console.error("Database can't be connected"));
