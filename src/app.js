//app.js me 1)server create 2) server config but not start the server
const express = require("express");
const cookieParser= require("cookie-parser")

const authRouter = require("./routes/auth.routes")

const app = express();//server ka instance

app.use(express.json())//req.body k ander k data ko padh sake isleye use kar rahe hai
app.use(cookieParser())
app.use("/api/auth/",authRouter)

module.exports = app;