const express=require("express");
const mongoose=require("mongoose");
const { errorHandler }=require('./middleware/errorHandlingMiddleware')
require('dotenv').config()
const bodyParser = require('body-parser')
const app=express();
const taskRoutes=require("./routes/tasks")
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


//routes
app.use(taskRoutes)




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
