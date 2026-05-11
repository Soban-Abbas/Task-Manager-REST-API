const express=require("express");
const router=express.Router();
const taskControllers=require('../controllers/tasksController')

router.get('/task',taskControllers.getAllTasks)
router.post('/task', taskControllers.createNewTask)

module.exports=router