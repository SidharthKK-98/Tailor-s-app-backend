const express=require('express')
const protectRoute=require('../middleware/protectedRoute')
const orderController=require('../controllers/orderController')


const router=express.Router()

router.post('/orderAdd',protectRoute,orderController.addOrderController)
router.post('/getOrderDate',protectRoute,orderController.getExistingDate)
router.post('/getOrderItems',protectRoute,orderController.getOrderedItem)
router.get('/getAllOrderItems',protectRoute,orderController.getAllItems)
router.put('/updateOrderStatus/:id',protectRoute,orderController.finishedOrder)

router.get('/getfinished/:id',protectRoute,orderController.finishedOrder)



module.exports=router