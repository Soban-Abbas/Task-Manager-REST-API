const jwt = require("jsonwebtoken");

exports.generateJwt = (role, userId) => {
    const payload = {
        userId: userId,
        role: role,
    }
    const secretKey = `${process.env.jwtSecretKey}`;
    const Expirytime = { expiresIn: '1h' };

    let token = jwt.sign(
        payload,
        secretKey,
        Expirytime
    );

    return token;

}