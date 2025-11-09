const jwt=require('jsonwebtoken')

const generateToken=(userId,res)=>{

    const token=jwt.sign({userId},process.env.JWT_KEY,{
        expiresIn:'15d'
    })
    res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000, //milliseconds
        httpOnly:true,
        sameSite: "none", 
        secure: true,     
     })
     

}

module.exports=generateToken