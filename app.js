const express=require("express");
const mongoose=require("mongoose");
const { errorHandler }=require('./middleware/errorHandlingMiddleware')
require('dotenv').config()
const bodyParser = require('body-parser')
const app=express();
// Routes file imports
const taskRoutes=require("./routes/tasks")
const adminRoutes=require("./routes/admin")
const authRoutes=require("./routes/auth")
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


//routes
app.use(taskRoutes)
app.use(adminRoutes)
app.use(authRoutes);

//global errorMiddleware
app.use(errorHandler);

//db connection
const connect=async()=>{
    try {
        await mongoose.connect(`${process.env.DataBaseUrl}`)
        console.log("Data Base connected");
        app.listen(8080);

    } catch (error) {
        console.log(error);
    }
}
connect();
