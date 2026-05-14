const { validationResult } = require("express-validator")
const taskModel = require("../models/taskModel");
exports.getAllTasks = async (req, res, next) => {
    return console.log(req.user);
    const page = parseInt(req.query.page) || 1;
    const limit = 5;

    try {

        let tasks = await taskModel.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);
        if (tasks.length === 0) {
            return res.status(404).json({
                message: "No task found"
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

    let errors = validationResult(req);
    // console.log(error.array());
    if (!errors.isEmpty()) {
        const error = new Error("Validation errors")
        error.status = 422;
        error.data = errors.array();
        return next(error)
    }
    try {

        const task = new taskModel({
            title: req.body.title,
            discription: req.body.discription,
            status: req.body.status,
            deadline: req.body.deadline,
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
exports.getSingleTask = async (req, res, next) => {
    try {
        const task = await taskModel.findById({ _id: req.params.taskId });
        if (!task) {
            return res.status(404).json({
                message: "No task found",
                task: []
            })
        }
        res.status(200).json({
            task
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteTask = async (req, res, next) => {
    try {
        const task = await taskModel.deleteOne({ _id: req.params.taskId });

        if (task.deletedCount === 1) {
            return res.status(200).json({
                message: "task deleted Successfully",

            })
            res.status(404).json({
                message: " Not Deleted : Something went wrong "
            })

        }
    } catch (error) {
        next(error)
    }
}

exports.updateTask = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error("Validation Error");
        error.data = errors.array()
        error.status = 422
        return next(error)
    }
    try {

        const updateTask = await taskModel.findById({ _id: req.params.taskId })
        updateTask.title = req.body.title || updateTask.title;
        updateTask.discription = req.body.discription || updateTask.discription;
        updateTask.status = req.body.status || updateTask.status
        updateTask.deadline = req.body.deadline || updateTask.deadline
        await updateTask.save();
        res.status(200).json({
            message: "task Updated Successfully"
        })


    } catch (error) {
        next(error)

    }


}