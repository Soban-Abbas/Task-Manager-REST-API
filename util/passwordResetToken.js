const jwt=require("jsonwebtoken");
exports.passwordResetToken=(id)=>{
    const payload={
        userId:id
    };
    const secretKey = process.env.passwordResetSecretKey;
    const Expirytime = { expiresIn: '1h' };

    const token=jwt.sign(payload,secretKey,Expirytime)
    return token;

}