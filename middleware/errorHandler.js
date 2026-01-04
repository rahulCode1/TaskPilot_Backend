const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        if (typeof next === "function") {
            return next(err)
        }
        return
    }


    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0]
        return res.status(409).json({
            success: false,
            message: `${field} already exists`,
            errors: [
                {
                    field,
                    value: err.keyValue[field]
                }
            ]
        })
    }

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Something went wrong.",
        errors: err.errors || null
    })


}

module.exports = errorHandler