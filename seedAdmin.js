const userModel=require("./models/userModel");
const mongoose=require("mongoose");

const bcrypt=require("bcrypt");
// const Connect=async ()=>{
//     try {
//       await mongoose.connect(`${process.env.DataBaseUrl}`)

//     } catch (error) {
//         console.log(error)
//     }
// }

// Connect();


const registeringAdmin=async()=>{
    try {
const password="admin12345";
const encryptedPassword=await bcrypt.hash(password,10);
        const admin = new userModel({
            name: "admin",
            email: "admin@gmail.com",
            role: "admim",
            password:encryptedPassword
        })
await admin.save();


    } catch (error) {
        console.log(error)
    }
}

// registeringAdmin();