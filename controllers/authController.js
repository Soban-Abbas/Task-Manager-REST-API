const { validationResult } = require("express-validator");
const sendEmail = require('../util/sendEmail');
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt');
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
        let from = `muhammadsobansoban49@gmail.com`;
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

        let emailMessage = await sendEmail({to,from,subject,text,html})
        res.status(200).json({
            message: "User register successfully",
            savedUser
        })

    } catch (error) {
        next(error)
    }
}

exports.postlogin = (req, res, next) => {

}