require("dotenv").config()//without writing this, u can't use process.env in config folder
const app = require("./src/app");
const connnectToDB = require("./src/config/db");
connnectToDB()
app.listen(3000,()=>{
    console.log("server is running on port 3000");
})