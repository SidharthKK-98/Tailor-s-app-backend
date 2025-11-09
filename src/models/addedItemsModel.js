const mongoose=require('mongoose')

const addItemsSchema=new mongoose.Schema({

    itemImg:{
        type:String,
        required:true
    },
    Type:{
        type:String,
        required:true
    },
    Fabric:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    Price:{
        type:String,
        required:true
    },
    userId: {
         type: mongoose.Schema.Types.ObjectId,
          ref: 'User', 
          required: true 
        }

}, {timestamps:true})

const addeItems=mongoose.model("addItems",addItemsSchema)

module.exports=addeItems