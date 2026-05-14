const jwt = require("jsonwebtoken")
exports.authorizeRequest = (req, res, next) => {
    try {
        
        let header = req.headers.Authorization || req.headers.authorization
        if (!header || !header.startsWith('Bearer')) {
            return res.status(401).json({
                message: "Unauthorized Request "
            })
        }
        const token = header.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized Request"
            })
        }

        const decode = jwt.verify(token, process.env.jwtSecretKey)
        req.user = {
            ...decode
        };
        next()




    } catch (error) {
        return res.status(401).json({
            message:"Unauthorized Request "
        })
        
    }
   

}