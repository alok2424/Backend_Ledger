const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

async function authMiddleware(req,res,next){
    //token can be present in either cookie or headers
    const token = req.cookies.token || req.headers.authorization?.split(" ")[ 1 ]

    if(!token){
        return res.status(401).json({
            message: " Unauthorized access, token is missing"
        })
    }


    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        
        //db se usko find kiya
        const user = await userModel.findById(decoded.userId)

        req.user =  user

        return next()//request ko aage controller pe forward kar dena
    }catch(err){
       return res.status(401).json({
        message:"Unauthorized access, token is invalid"
       })
    }
}

module.exports = {
    authMiddleware
}