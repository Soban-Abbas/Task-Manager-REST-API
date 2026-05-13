exports.errorHandler = (err, req, res, next) => {
   console.log(err.stack)
    let statusCode = err.status || 500;
    let message = err.message || "Internal server error";
    let data=err.data||[];
    res.status(statusCode).json({
        message,
         data
    })

}
