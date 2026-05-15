const { validationResult } = require("express-validator");
const sendEmail = require('../util/sendEmail');
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt');
const { generateJwt } = require("../util/generate_jwt");
const { passwordResetToken } = require('../util/passwordResetToken')
const jwt = require("jsonwebtoken")
exports.postSignup = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            let error = new Error("validation Error")
            error.status = 422;
            error.data = errors.array()
            throw error;
        }

        let salt = 10;
        const encryptedPassword = await bcrypt.hash(req.body.password, salt)
        const user = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: encryptedPassword,
            role: "user"
        })

        let savedUser = await user.save();
        if (!savedUser) {
            const error = new Error("User not register")
            error.status = 401;
            throw error;
        }
        let to = req.body.email;
        let from = `${process.env.SenderMail}`;
        let subject = "WellCome to Task Manager ";
        let text = `Hi ${req.body.name}
        Welcome to Task Manager.
        Your account has been created successfully.
        Login to start managing your tasks.
        Login:
        http://localhost:8080/login
        Thanks,
        Task Manager Team`;
        let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Welcome</title>
</head>
<body style="font-family: Arial, sans-serif; background:#f4f4f4; padding:40px;">

  <div style="max-width:500px; margin:auto; background:white; padding:30px; border-radius:10px; text-align:center;">

    <h2>Welcome to Task Manager</h2>

    <p>Hi ${req.body.name},</p>

    <p>Your account has been created successfully.</p>

    <a href="http://localhost:8080/login"
       style="display:inline-block;
              margin-top:20px;
              padding:12px 24px;
              background:#111827;
              color:white;
              text-decoration:none;
              border-radius:6px;">
      Login
    </a>

  </div>

</body>
</html>`

        let emailMessage = await sendEmail({ to, from, subject, text, html })
        res.status(200).json({
            message: "User register successfully",
            savedUser
        })

    } catch (error) {
        next(error)
    }
}

exports.postlogin = async (req, res, next) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation Errors");
            error.data = errors.array();
            error.status = 401;
            throw error;
        }


        let user = await userModel.findOne({ email: req.body.email })
        let validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) {
            return res.status(401).json({
                message: "wrong Email or Password"
            })
        }

        let token = generateJwt(user.role, user._id);

        res.status(200).json({
            message: "Login Successfull",
            token: token
        })




    } catch (error) {
        throw error
    }


}

exports.forgetPassword = async (req, res, next) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("validation Error");
            error.status = 422;
            error.data = errors.array();
            throw error;
        }
        const email = req.body.email;

        const user = await userModel.findOne({ email: email })
        if (!user) {
            return res.status(404).json({
                message: "User Not found "
            })
        }

        const token = passwordResetToken(user._id);
        const resetURL = `http://localhost:8080/reset-password/${token}/${user._id}`

        let to = email;
        let from = `${process.env.SenderMail}`;
        let subject = "Reset Password ";
        let text = `Hi
       You are receiving this because you (or someone else) have requested the reset of the password for your account.
      Please click on the following link, or paste this into your browser to complete the process:
      ${resetURL}
      If you did not request this, please ignore this email and your password will remain unchanged.,
        Task Manager Team`;
        let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Welcome</title>
</head>
<body style="font-family: Arial, sans-serif; background:#f4f4f4; padding:40px;">

  <div style="max-width:500px; margin:auto; background:white; padding:30px; border-radius:10px; text-align:center;">

    <h2>Welcome to Task Manager</h2>

    <p>Hi,</p>

    <p>Reset Your Password.</p>

    <a href=${resetURL}
       style="display:inline-block;
              margin-top:20px;
              padding:12px 24px;
              background:#111827;
              color:white;
              text-decoration:none;
              border-radius:6px;">
      Reset Password
    </a>

  </div>

</body>
</html>`



        const emailMessage = await sendEmail({ to, from, subject, text, html });

        res.status(200).json({
            message: "Check Email to reset password",
            resetURL
        })






    } catch (error) {
        next(error)

    }

}

exports.resetPassword = async (req, res, next) => {
    try {


        const errors=validationResult(req);
        if(!errors.isEmpty()){
            const error = new Error("validation Error");
            error.status = 422;
            error.data = errors.array();
            throw error;
        }
        const { userId, token } = req.params;
        const newPassword = req.body.password;
        const user = await userModel.findById({ _id: userId })
        if (!user) {
            return res.status(404).json({
                message: "User Not  found"
            })
        }
        const secretKey = process.env.passwordResetSecretKey;
        const verifyToken = jwt.verify(token, secretKey);
        const salt = 10;
        const encryptedPassword = await bcrypt.hash(newPassword, salt)

      user.password=encryptedPassword;
      await user.save();
      res.status(200).json({
        message:"Password Updated Successfully"
      })

        


    } catch (error) {
        next(error)
    }


}