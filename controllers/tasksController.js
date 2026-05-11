const taskModel = require("../models/taskModel");
exports.getAllTasks = async(req, res, next) => {
const page = parseInt(req.query.page) || 1;
const limit=5;

try {

    let tasks = await taskModel.find().sort({ createdAt:-1}).skip((page-1)*limit).limit(limit);
    if(tasks.length===0){
       return  res.status(404).json({
        message:"No task found"
       })
    }
    res.status(200).json({
        tasks
    })

   
} catch (error) {
    next(error)
}
    


}

exports.createNewTask = async (req, res, next) => {
    try {

        const task = new taskModel({
            title: req.body.title,
            discription: req.body.discription,
            status: req.body.status,
            creator: "Ali"
        })

        await task.save();

        res.status(201).json({
            message: "New Task Added",
            task
        })
    } catch (error) {
        next(error)
    }



}