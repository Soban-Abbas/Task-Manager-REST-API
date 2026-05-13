const { validationResult } = require("express-validator");
const userModel=require('../models/userModel')
const bcrypt = require('bcrypt');
exports.postSignup = async(req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            let error = new Error("validation Error")
            error.status = 422;
            error.data = errors.array()
            throw error;
        }

        let salt=10;
const encryptedPassword= await bcrypt.hash(req.body.password,salt)
const user=new userModel({
    name:req.body.name,
    email:req.body.email,
    password:encryptedPassword,
    role:"user"
})

let savedUser=await user.save();
if(!savedUser){
    const error=new Error("User not register")
    error.status=401;
    throw error;
}
res.status(200).json({
    message:"User register successfully",
    savedUser
})

    }catch (error) {
        next(error)
    }



}