exports.errorHandler = (err, req, res, next) => {
    console.log(err.stack)
    let statusCode = err.status || 500;
    let message = err.message || "Internal server error";
    let errorName = err.name || "Server Issue"
    res.status(statusCode).json({
        message,
        errorName
    })

}
