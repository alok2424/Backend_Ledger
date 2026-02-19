const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken");
const emailService = require('../services/emial.service');
/**
* - user register controller
* - POST /api/auth/register
*/
async function userRegisterController(req,res){
   const {email,password,name} = req.body
 
   //check karenge ki db me already exists karta hai ki nhi
   const isExists = await userModel.findOne({
    email: email
   })
   if(isExists){
    return res.status(422).json({
        message: "User already exists with email",
        status:"failed"
    })
   }
   //create a new user
   const user = await userModel.create({
    email,password,name
   })
  
   const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"3d"})//ask for payload and private key

   res.cookie("token",token)
   res.status(201).json({
    user:{
        _id:user._id,
        email:user.email,
        name:user.name
    },token
   })//whenever we add a creating a new resource in the API, if it is due to user request then status code is 201

  await emailService.sendRegistrationEmail(user.email,user.name)//node-mailer 
}

/**
 * - User Login Controller
 * - POST /api/auth/login
 */

async function userLoginController(req,res){
    const {email,password} = req.body//postman se ye data milega

    const user = await userModel.findOne({email}).select("+password")//email k basis pe user ko find karenge

    if(!user){
        return res.status(401).json({
            message: "Email or password is INVALID"
        })
    }
   const isValidPassword = await user.comparePassword(password)

   if(!isValidPassword){
     return res.status(401).json({
        message: "Email or password is INVALID"
     })
   }
   const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"3d"});//creating token
   
   res.cookie("token",token)   
   
   res.status(200).json({//bcz we are not creating new user
    user:{
        _id:user._id,
        email:user.email,
        name:user.name
    },token
   })
}
module.exports = {
    userRegisterController,userLoginController
}