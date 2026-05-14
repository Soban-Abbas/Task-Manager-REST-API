const userModel=require('../../models/userModel');
const {check}=require("express-validator");
exports.loginValidation=[
    check('email')
    .notEmpty()
    .withMessage("Please Enter Email")
    .bail()
    .isEmail()
    .withMessage("Enter valid Email")
    .bail()
    .custom(async(value,{req})=>{
        try {
            const userExist=await userModel.findOne({email:value});
            if(!userExist){
                throw new Error("User Not registered with this Email");
            }
        } catch (error) {
            throw error
        }
    }),
    check('password')
    .notEmpty()
    .withMessage("Enter Password")
]