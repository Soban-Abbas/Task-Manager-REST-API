const express = require("express");
const router = express.Router();
const { authorizeRequest }=require("../middleware/authorizeRequest");
const taskControllers = require('../controllers/tasksController')
const { check } = require('express-validator')
router.get('/task', authorizeRequest,taskControllers.getAllTasks)
router.post('/task', [
    check('title')
        .notEmpty()
        .withMessage("title Cannot be Empty")
        .bail()
        .isAlpha()
        .withMessage("Title can only contain letters")
        .bail()
        .trim()
        .isLength({ min: 5, max: 15 })
        .withMessage("title must be atleast 3-15 characters"),
    check('discription')
        .notEmpty()
        .trim()
        .isLength({ min: 5, max: 100 })
        .withMessage("Discription must be atleast 5-100 characters")
        .bail()
        .isAlphanumeric()
        .withMessage("Discription can only contain letters and numbers"),
    check('status')
        .notEmpty()
        .withMessage("Status is incorrect")
        .bail()
        .trim()
        .isAlpha()
        .withMessage("Status is incorrect")
        .bail()
        .isLength({ max: 10 })
        .withMessage("Status is incorrect"),
        check('deadline')
        .notEmpty()
        .bail()
        .withMessage("Date is required")
        .isDate()
        .withMessage("Invalid Date")
]
    , taskControllers.createNewTask)
router.get('/task/:taskId', taskControllers.getSingleTask)
router.delete('/task/:taskId', taskControllers.deleteTask)
router.patch('/updateTask/:taskId',
    [
        check('title')
            .isAlpha()
            .trim()
            .withMessage("Title can only contain letters")
            .bail()
            .isLength({ min: 3, max: 15 })
            .withMessage("title must be atleast 3-15 characters"),
        check('discription')
            .notEmpty()
            .withMessage("Discription is empty")
            .bail()
            .trim()
            .isLength({ min: 5, max: 100 })
            .withMessage("Discription must be atleast 5-100 characters"),

        check('status')
            .notEmpty()
            .withMessage("Status is missing")
            .bail()
            .trim()
            .isAlpha()
            .withMessage("Status is incorrect")
            .bail()
            .isLength({ max: 10 })
            .withMessage("Status is incorrect"),
        check('deadline')
            .notEmpty()
            .bail()
            .withMessage("Date is required")
            .isDate()
            .withMessage("Invalid Date")
    ]
    , taskControllers.updateTask);
module.exports = router