const express=require('express')
const protectRoute=require('../middleware/protectedRoute')
const multermiddleware=require('../middleware/multer')
const itemsController=require('../controllers/itemsController')

const router=new express.Router()

router.post('/fashionAndFabricAdd',protectRoute,multermiddleware.single('itemImg'),itemsController.addItemsController)
router.get('/fashionAndFabricGet',protectRoute,itemsController.getAddedItemsController)
router.get('/fashionAndFabricGetUnique',protectRoute,itemsController.getUniqueFabricsController)
router.get('/fashionAndFabricGetItemByFabric/:fabric',protectRoute,itemsController.getAddedItemsByFabricController)
router.delete('/deleteItem/:id',protectRoute,itemsController.deleteAddedItem)



module.exports=router