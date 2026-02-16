const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required:[true,"Email is require for creating a user"],
        trim:true,
        lowercase:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._]+\.[a-zA-Z]{2,}$/,"Invalid email"],
        unique:[true,"Email already exists"]
    },name:{
          type:String,
          required:[true,"Name is required for creating an account"]
    },password:{
        type:String,
        required:[true,"Password is required for creating an account"],
        minlength:[6,"password should coantain more than 6 character"],
        select:false//in future, jab bhi user ki query mangva rahe honge, to password un query me nhi ayega 
    }
},{
    timestamps:true
})
userSchema.pre("save",async function(){
 if(!this.isModified("password")){
    return 
 }
 const hash = await bcrypt.hash(this.password,10)
 this.password = hash;
 return 
})

userSchema.methods.comparePassword= async function(password){
 //   console.log(password,this.password);
  return bcrypt.compare(password,this.password);//return true or false
}

const userModel = mongoose.model("user",userSchema)
module.exports = userModel