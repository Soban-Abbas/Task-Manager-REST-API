const express = require("express");
const router = express.Router();
const { authorizeRequest }=require("../middleware/authorizeRequest");
const taskControllers = require('../controllers/tasksController')
const { check } = require('express-validator')
router.get('/task',authorizeRequest,taskControllers.getAllTasks)
router.post('/task', authorizeRequest,[
    check('title')
        .notEmpty()
        .withMessage("title Cannot be Empty")
        .bail()
        .matches(/^[a-zA-Z0-9 ]+$/)//expect space, small lettes , cpital lettes, counting etc 
        .trim()
        .isLength({ min: 5, max: 15 })
        .withMessage("title must be atleast 3-15 characters"),
    check('discription')
        .notEmpty()
        .trim()
        .isLength({ min: 5, max: 100 })
        .withMessage("Discription must be atleast 5-100 characters")
        .bail(),
    check('status')
        .notEmpty()
        .withMessage("Status is incorrect")
        .bail()
        .isIn(['completed','in-progress','pending'])//only these values expects
        .withMessage('Invalid status'),
    check('deadline')
        .notEmpty()
        .bail()
        .withMessage("Date is required")
        .isISO8601()//expect data in formate 2026-05-20
        .withMessage("Invalid Date")
]
    , taskControllers.createNewTask)
router.get('/task/:taskId', authorizeRequest,taskControllers.getSingleTask)
router.delete('/task/:taskId', authorizeRequest,taskControllers.deleteTask)
router.patch('/updateTask/:taskId',authorizeRequest,
    [
        check('title')
            .notEmpty()
            .withMessage("title Cannot be Empty")
            .bail()
            .matches(/^[a-zA-Z0-9 ]+$/)//expect space, small lettes , cpital lettes, counting etc 
            .trim()
            .isLength({ min: 5, max: 15 })
            .withMessage("title must be atleast 3-15 characters"),
        check('discription')
            .notEmpty()
            .trim()
            .isLength({ min: 5, max: 100 })
            .withMessage("Discription must be atleast 5-100 characters"),
        check('status')
            .notEmpty()
            .withMessage("Status is incorrect")
            .bail()
            .isIn(['completed', 'in-progress', 'pending'])//only these values expects
            .withMessage('Invalid status'),
        check('deadline')
            .notEmpty()
            .bail()
            .withMessage("Date is required")
            .isISO8601()//expect data in formate 2026-05-20
            .withMessage("Invalid Date")
    ]
    , taskControllers.updateTask);
module.exports = router