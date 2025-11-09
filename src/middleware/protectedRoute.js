const jwt=require('jsonwebtoken')
const users=require('../models/userModel')

const protectRoute=async(req,res,next)=>{

    try{

        const token=req.cookies?.jwt
        console.log("token",token);
        
        if(!token){
            return res.status(401).json({error:'unautherized - no token provided'})
        }

        const decoded=jwt.verify(token,process.env.JWT_KEY)

        if(!decoded){
            return res.status(401).json({error:'unautherized - invalid token'})
        }

        const user=await users.findById(decoded.userId).select("-password")//token must include userId when it creating,so we can use here
        if(!user){
         return   res.status(404).json({error:"user not found"})
        }

        req.user=user
        next()
    }
    catch(err){
        console.log(err);
        
    }
}

module.exports=protectRoute