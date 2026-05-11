const mongooose = require("mongoose");
const userSchema = new mongooose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type: String,
        required: true
    }
},{timestamps:true})
module.exports=mongooose.model('user',userSchema);