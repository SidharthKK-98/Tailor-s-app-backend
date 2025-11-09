const express=require('express')
const protectRoute=require('../middleware/protectedRoute')
const userController=require("../controllers/userController")


const router=new express.Router()

router.get('/getAllCustomers/:id',protectRoute,userController.getAllUsers)
router.delete('/deleteCustomer/:id',protectRoute,userController.deleteUser)
router.put('/updateUserStatus/:id',protectRoute,userController.updateBlock)
router.get('/getUserBlockStatus/:id',protectRoute,userController.getBlockedUser)



module.exports=router