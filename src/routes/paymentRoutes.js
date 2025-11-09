const express=require('express')

const router=new express.Router()
const paymentController=require('../controllers/paymentController')



router.post('/paymentprocess',paymentController.createOrder)
router.get('/getApiKey',paymentController.getKey)
router.post('/paymentVerification',paymentController.paymentVerification)



module.exports=router