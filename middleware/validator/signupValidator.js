const { check } = require('express-validator')

const userModel = require("../../models/userModel");
exports.signupValidation = [
    check('name')
        .notEmpty()
        .withMessage("Name is Empty")
        .bail()
        .isAlpha()
        .withMessage("Only Letters are allowed")
        .isLength({ min: 3, max: 15 })
        .withMessage("Name length should be in between 2-15"),
    check('email')
        .isEmail()
        .withMessage("Invalid Email")
        .bail()
        .notEmpty()
        .withMessage("Email is Empty")
        .bail()
        .custom(async(value, { req }) => {
            try {
                const existUser = await userModel.findOne({ email: value })
                if (existUser) {
                    throw new Error("Email already registered")
                }
                return true
            } catch (error) {
                throw error
            }
        }),

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