const mongoose=require("mongoose");
const taskSchema=new mongoose.Schema({
    title:{
        type:String ,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    deadline:{
        type:Date,
        required:true
    },
    creator:{
        // type:mongoose.Schema.Types.ObjectId,
        // ref:'user',
        // required:true
        type: String 
    }
},{timestamps:true});

module.exports=mongoose.model('task',taskSchema)