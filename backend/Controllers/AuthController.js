const UserModel = require("../Models/User");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const signup=async (req,res)=>{
   try {
       const {name,email,password}=req.body;
       const user= await UserModel.findOne({email});
       if(user){
           return res.status(409)
           .json({message:'User is already exits,you can login' , success:false});
       }
       const userModel=new UserModel({name,email,password});
       userModel.password = await bcrypt.hash(password,10);
       await userModel.save();
       res.status(201)
       .json({
          message:"Signup successfully",
          success:true
       })
   } catch (error) {
       res.status(500)    
         .json({
              message:"Internal server error",
              success:false
         })
   }
}

const login=async (req,res)=>{
   try {
       const {email,password}=req.body;
       const user= await UserModel.findOne({email});
       const errormessage='Auth failed email or password is wrong';

       if(!user){
           return res.status(403)
           .json({message: errormessage, success:false});
       }
       const isPassEqual=await bcrypt.compare(password,user.password);
       if(!isPassEqual){
           return res.status(403)
          .json({message: errormessage, success:false});
       }
  
        const jwtToken=jwt.sign({email:user.email,_id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'180'}
        )
       
       res.status(200)
       .json({
          message:"Login successfully",
          success:true,
          jwtToken,
          email,
          name:user.name 
       })
   } catch (error) {
       res.status(500)    
         .json({
              message:"Internal server error",
              success:false
         })
   }
}

module.exports={
    signup,
    login
}