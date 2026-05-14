exports.isAdmin=(req,res,next)=>{
    try {
        if(req.user.role!=='admin'){
            return res.status(401).json({
                message:"UnAuthorized Request "
            })
        }
        next()
    } catch (error) {
        next(error)
    }
}