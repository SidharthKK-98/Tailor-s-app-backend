const Razorpay=require('razorpay')
const addedItem=require('../models/addedItemsModel')
const crypto=require('crypto')





const razorpay=new Razorpay({

    key_id:process.env.RAZORPAY_API_KEY,
    key_secret:process.env.RAZORPAY_API_SECRET

})

exports.createOrder=async(req,res)=>{
   try{

    const {addedItemId}=req.body

    const item = await addedItem.findOne({_id:addedItemId})
    if(!item){
        return res.status(404).json({error:"item not found"})
    }

    const amount=Number(item.Price)*100

    const options={
        amount,
        currency:"INR",

    }

    const order=await razorpay.orders.create(options)
    res.status(200).json(order)

   }
   catch(err){
    res.status(500).json({error:"internal sever error"})
    
   }
}

exports.getKey=(req,res)=>{
    res.status(200).json({
        key:process.env.RAZORPAY_API_KEY
    })
}

exports.paymentVerification=async(req,res)=>{

    const {razorpay_payment_id,razorpay_order_id,razorpay_signature}=req.body
    const body= razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature=crypto.createHmac("sha256",process.env.RAZORPAY_API_SECRET).update(body.toString()).digest("hex")
    
    const isAuthentic=expectedSignature===razorpay_signature;
    if(isAuthentic){
        return res.redirect(`http://localhost:5173/paymentSuccess?reference=${razorpay_payment_id}`)
    }
    else{

        res.status(404).json({
            success:false
        })
        

    }
    

}