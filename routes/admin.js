const express=require("express")
const router=express.Router();
const adminController=require("../controllers/adminController")
const {authorizeRequest}=require("../middleware/authorizeRequest")
const { isAdmin }=require('../middleware/isAdmin')
router.get('/users', authorizeRequest, isAdmin,adminController.getAllUsers)
module.exports=router;