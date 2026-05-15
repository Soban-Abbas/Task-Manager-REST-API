const express = require("express");
const router = express.Router();
const { check } = require("express-validator")
const authController = require('../controllers/authController')
const { signupValidation } = require("../middleware/validator/signupValidator")
const { loginValidation } = require('../middleware/validator/loginValidation')
router.post('/signup', signupValidation, authController.postSignup)
router.post('/login', loginValidation, authController.postlogin)
router.post('/forget-password',
    [
        check('email')
            .notEmpty()
            .withMessage("Emter Email")
            .isEmail()
            .withMessage("Invalid Email")
    ]
    , authController.forgetPassword)
router.post('/reset-password/:token/:userId',
    [
        check('password')
        .notEmpty()
        .withMessage("Password Cannot be empty")
        .bail()
        .isLength({ min: 5, max: 15 })
        .withMessage("Password length must be inbetween 5 to 15"),
    check('confirmPassword')
        .notEmpty()
        .withMessage("Confirm-Password Cannot be empty")
        .bail()
        .isLength({ min: 5, max: 15 })
        .withMessage("confirm-Password length must be inbetween 5 to 15")
        .bail()
        .custom((value, { req }) => {

            try {
                if (value !== req.body.password) {
                    throw new Error("Password and Confirm Password Mismatch")
                }
                return true
            } catch (error) {
                throw error;
            }
        })

    ]

    , authController.resetPassword)
module.exports = router;