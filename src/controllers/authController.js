const users=require('../models/userModel')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const generateToken=require('../utils/generateToken')


exports.signUpUser=async(req,res)=>{

    try{
        const {fullname,username,password,confirmPassword,role}=req.body

        // if(role=="admin" && secretkey!=="SID"){
            
        //         return res.status(400).json({err:"invalid secretkey"})
        // }

        if(password!==confirmPassword){
            console.log("password is incorrect");
            return res.status(401).json({error:'password is not matching'})
            
        }
        //hash password
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        const newUser=new users({
            fullname,
            username,
            password:hashedPassword,
            role
        })

        if(newUser){
            generateToken(newUser._id,res)

            await newUser.save()
            res.status(200).json({
                _id:newUser._id,
                fullname:newUser.fullname,
                username:newUser.username,
                password:newUser.password,
                role:newUser.role
            })
          }
        else{
            res.status(400).json({error:"invalid user data"})

        }

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'})
        
    }
}

exports.loginUser=async(req,res)=>{

    try{

        const {username,password,role}=req.body
        const user=await users.findOne({username,role})

        const isPasswordCorrect=bcrypt.compare(password,user?.password || "")
        if(!user || !isPasswordCorrect){
            return res.status(401).json({error:"invalid credentials"})
        }
        generateToken(user._id,res)
        return res.status(200).json({
            _id:user._id,
            fullname:user.fullname,
            username:user.username,
            role:user.role
        })

    }
    catch(err){
        console.log(err);
        res.status(500).json({err:"internal server error"})
        
    }
}


exports.logoutUser=(req,res)=>{

    try{

        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"loggedout successfully"})
    }
    catch(err){
        console.log("error in logout controller",err);
        res.status(500).json({error:"internal server error"})
    }
}