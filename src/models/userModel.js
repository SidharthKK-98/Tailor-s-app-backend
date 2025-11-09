const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({

    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    block: {
        type: Boolean,
        default: false 
    }
})

const users=mongoose.model("users",userSchema)

module.exports=users