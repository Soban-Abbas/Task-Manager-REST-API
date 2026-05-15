const userModel=require('../models/userModel')
const taskModel=require("../models/taskModel")
exports.getAllUsers=async(req,res,next)=>{
const page=req.query.page || 1;
const limit=5;
try {
    const users=await userModel.find({role:'user'}).select('_id name email').skip((page-1)*limit).limit(limit);
    if(users.length===0){
    return res.status(404).json({
            message:"Users not available",
            users:[]
        })}

        // const limitUserData=users.map((user)=>{
        //     return{
        //         _id:user._id,
        //         name:user.name,
        //         email:user.email
        //     }
        // })
        res.status(200).json({
            message:"Users fetch successfully",
            users:users
        })
    }
 catch (error) {
    next(error)
    
}
}

exports.getUsersWithTasks=async(req,res,next)=>{
try {
    const page=req.query.page ||  1;
    const limit=5;
    const users=await userModel.find({role:'user'}).select('_id name email').skip((page-1)*limit).limit(limit);
    if(users.length==0){
     return   res.status(404).json({
            message:"user not found"
        })

    }

    const userWithTasks=await Promise.all( 
        users.map(async(user)=>{
        const tasks=await taskModel.find({creator:user._id})
        return {
            user,
            tasks
        }
    }))

    res.status(200).json({
        message:"User with their data fetch successfully",
        userWithTasks
    })
} catch (error) {
    next(error)
    
}
    
}
exports.getOneUserwithTask=async(req,res,next)=>{
    try {
        const [user, tasks] = await Promise.all([
            await userModel.findById({_id:req.params.userId}).select('_id name email'),
            await taskModel.find({creator:req.params.userId})
        ])
        if(!user || !tasks){
           return res.status(404).json({
                message:"Not Found"
            })
        }

        res.status(200).json({
            message:"Succesfully found user with Tasks",
            user,
            tasks
        })
    } catch (error) {
        next(error)
    }

}
exports.deleteUser=async(req,res,next)=>{
    try {

        const user=await userModel.findById({_id:req.params.userId})
        if(!user){
          return   res.status(404).json({
                message:"User Not exist"
            })
        }

        const [deletedTasks, deletedUser] = await Promise.all([
             taskModel.deleteMany({ creator: req.params.userId }),
             userModel.deleteOne({ _id: req.params.userId })
        ])

        if (deletedTasks.deletedCount >= 0 && deletedUser.deletedCount===1){
          return  res.status(202).json({
                message:"user deleted Successfully"
            })
        }
        res.status(404).json({
            message:"user not deleted"
        })
        
    } catch (error) {
        next(error)
    }

}