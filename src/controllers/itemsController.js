const addItems=require('../models/addedItemsModel')
const order=require('../models/orderModel')
const mongoose=require('mongoose')

exports. addItemsController=async(req,res)=>{

    const{Type,Fabric,Description,Price}=req.body

    const userId=req.user._id

    if (!req.file) {
        return res.status(400).json({ error: 'itemImg is required' });
        alert("image is required")
        
    }

    const itemImg=req.file?.filename

    console.log(Type,Fabric,Description,Price,userId,itemImg);
    
    try{

        const existingItem=await addItems.findOne({
            Type,Fabric,Price
        })
        if(existingItem){
            res.status(406).json("item is already added")
            return
        }

        const newItem=new addItems({
            Type,
            Fabric,
            Description,
            Price,
            userId,
            itemImg
        })
        await newItem.save()
        res.status(200).json("item saved successfully")

    }
    catch(err){
        console.log(err);
        
    }
}

exports.getAddedItemsController=async(req,res)=>{

    try{

        const AllItemsAdded=await addItems.find()
        res.status(200).json(AllItemsAdded)

    }
    catch(err){
        console.log(err);
        
    }
}

exports.getUniqueFabricsController=async(req,res)=>{

    try{

        const uniqueFabrics=await addItems.distinct("Fabric")
        res.status(200).json(uniqueFabrics)

    }
    catch(err){
        console.log(err);
        
    }
}

exports.getAddedItemsByFabricController=async(req,res)=>{

    try{

        const {fabric}=req.params
        const sortedItems=await addItems.find({Fabric:fabric.toUpperCase()}) 
        res.status(200).json(sortedItems)

    }
    catch(err){
        console.log(err);
        
    }

}



exports.deleteAddedItem=async(req,res)=>{

    const {id}=req.params

    try{

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }
    
        const existingOrder=await order.findOne({addedItemId:id})
        if(existingOrder){
            return res.status(201).json("you can't delete this item,order is still existing")
        }
        const deletedItem=await addItems.findByIdAndDelete(id)
        return res.status(200).json({message:"Item deleted",deletedItem})

    }
    catch(err){
        console.log(err);
        
    }
}