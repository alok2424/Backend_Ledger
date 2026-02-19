//app.js me 1)server create 2) server config but not start the server
const express = require("express");
const cookieParser= require("cookie-parser")

const app = express();//server ka instance

app.use(express.json())//req.body k ander k data ko padh sake isleye use kar rahe hai
app.use(cookieParser())
/**
 * - Routes Required
 */
const authRouter = require("./routes/auth.routes");
const accountRouter = require("./routes/account.routes");
/**
 * Use Routes
 */
app.use("/api/auth/",authRouter)
app.use("/api/accounts",accountRouter)
module.exports = app;