const express=require("express")
const router=express.Router();
const adminController=require("../controllers/adminController")
const {authorizeRequest}=require("../middleware/authorizeRequest")
const { isAdmin }=require('../middleware/isAdmin')
router.get('/users', authorizeRequest, isAdmin,adminController.getAllUsers)
router.get('/userstasks',authorizeRequest,isAdmin,adminController.getUsersWithTasks)
router.get('/usertask/:userId',authorizeRequest,isAdmin,adminController.getOneUserwithTask)
router.delete('/user/:userId',authorizeRequest,isAdmin,adminController.deleteUser)
module.exports=router;