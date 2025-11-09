// const { default: mongoose } = require('mongoose')
const order =require('../models/orderModel')
const mongoose=require('mongoose')


exports.addOrderController=async(req,res)=>{

    const {chest,waist,length,sleeve,inseam,shoulder,deliveryDate,addedItemId}=req.body
    userId=req.user._id

    try{

        const parsedDate = new Date(deliveryDate + "T00:00:00Z");
        let expiresAt = new Date(parsedDate)
        expiresAt.setDate(expiresAt.getDate() + 2)

        const measurements = {
            chest,
            waist,
            length,
            sleeve,
            inseam,
            shoulder
        };

        console.log("before saving");
        
        const newOrder= new order({

            userId,
            addedItemId,
            measurements,
            deliveryDate,
            expiresAt
        })
       
        await newOrder.save()

        console.log("before saving");


        const orders=await order.findById(newOrder._id)
        .populate('userId','fullname username')
        .populate('addedItemId','itemImg Type Fabric Price')
        .exec()

        


        res.status(200).json(orders)

    }
    catch(err){
        console.log(err);
        
    }

}

exports.getExistingDate=async(req,res)=>{

    const deliveryDate=req.body.deliveryDate
    console.log(req.body);
    console.log(deliveryDate);
    
    

    const existingDate=await order.findOne({
        deliveryDate
    })
    
    if(!existingDate){
        return res.status(200).json({message:`The date ${deliveryDate} not added`})

    }

    return res.status(201).json({message:`The date ${deliveryDate} already added`})
    

    

}

exports.getOrderedItem=async(req,res)=>{

    const userId=req.body.userId

    try{

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid User ID format" });
        }

        const orderDetails = await order.find({ userId }) // Use find() instead of findById()
            .populate("userId", "fullname username")
            .populate("addedItemId", "itemImg Type Fabric Price")
    
        res.status(200).json(orderDetails)

    }
    catch(err){
        console.log(err);
        
    }

   
}

exports.getAllItems=async(req,res)=>{

    try{

        const allItems=await order.find()
        .populate("userId", "fullname username")
        .populate("addedItemId", "itemImg Type Fabric Price")
        res.status(200).json(allItems)
    }
    catch(err){
        console.log(err);
        
    }
}

exports.finishedOrder=async(req,res)=>{


    try{

        const {id}=req.params
        const {finished}=req.body

        const updateOrderStatus=await order.findByIdAndUpdate(

            id,
            {finished:finished},
            {new:true} //return laatest/updated value
        )

        if(!updateOrderStatus){
            return res.status(201).json({message:"order not found"})
        }

        res.status(200).json({message:"user status updated",order:updateOrderStatus})

    }
    catch(err){
        console.log(err);
        
    }

}

