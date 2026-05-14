const express=require("express");
const router=express.Router();
const authController=require('../controllers/authController')
const { signupValidation }=require("../middleware/validator/signupValidator")
const { loginValidation }=require('../middleware/validator/loginValidation')
router.post('/signup',signupValidation,authController.postSignup)
router.post('/login',loginValidation,authController.postlogin )
module.exports=router;