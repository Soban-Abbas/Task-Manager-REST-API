const userModel=require('../models/userModel')
exports.getAllUsers=async(req,res,next)=>{
const page=req.query.page || 1;
const limit=5;
try {
    const users=await userModel.find({role:'user'}).skip((page-1)*limit).limit(limit);
    if(users.length===0){
    return res.status(404).json({
            message:"Users not available",
            users:[]
        })}

        const limitUserData=users.map((user)=>{
            return{
                _id:user._id,
                name:user.name,
                email:user.email
            }
        })
        res.status(200).json({
            message:"Users fetch successfully",
            users:limitUserData
        })
    }
 catch (error) {
    next(error)
    
}
}