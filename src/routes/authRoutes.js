const express=require("express")

const router=new express.Router()
const authController=require('../controllers/authController')

router.post('/signup',authController.signUpUser)
router.post('/login',authController.loginUser)
router.post('/logout',authController.logoutUser)


module.exports=router