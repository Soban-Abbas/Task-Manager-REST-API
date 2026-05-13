const express=require("express");
const router=express.Router();
const authController=require('../controllers/authController')
const { signupValidation }=require("../middleware/validator/signupValidator")
router.post('/signup',signupValidation,authController.postSignup)

module.exports=router;