const mongoose=require('mongoose')
const user=require('../models/userModel')
const order=require('../models/orderModel')

exports.getAllUsers=async(req,res)=>{

    const {id}=req.params
    // console.log(id);
    

    try{

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }

        const result=await user.find({ _id: { $ne: new mongoose.Types.ObjectId(id) } }).select("-password")
        res.status(200).json(result)
        // console.log(result);
        

    }
    catch(err){
        console.log(err);
        
    }
}

exports.updateBlock=async(req,res)=>{

    try{

        const {id}=req.params
        const {block}=req.body

        const updateUserStatus=await user.findByIdAndUpdate(

            id,
            {block:block},
            {new:true} //return laatest/updated value
        )

        if(!updateUserStatus){
            return res.status(201).json({message:"user not found"})
        }

        res.status(200).json({message:"user status updated",user:updateUserStatus})

    }
    catch(err){
        console.log(err);
        
    }

}
exports.getBlockedUser=async(req,res)=>{

    try{

        const {id}=req.params
        const result=await user.findById(id)
        console.log(res);
        return res.status(200).json(result)
        
    }
    catch(err){
        console.log(err);
        
    }


}

exports.deleteUser=async(req,res)=>{

    const {id}=req.params

    try{

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }
    
        const existingOrder=await order.findOne({userId:id})
        if(existingOrder){
            return res.status(201).json("you can't delete this customer,order is still existing")
        }
        const deletedCustomer=await user.findByIdAndDelete(id)
        return res.status(200).json({message:"customer account deleted",deletedCustomer})

    }
    catch(err){
        console.log(err);
        
    }

   




}