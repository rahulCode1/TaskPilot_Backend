const jwt = require("jsonwebtoken")
const HttpError = require("../model/http_error")

const checkAuth = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(" ")[1]

        if (!token) {
            return next(new HttpError("Not authenticated.", 401))
        }


        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        req.userData = { userId: decodedToken.userId }
        next()
    } catch (error) {
        return next(new HttpError("Authentication failed.", 401))
    }
}

module.exports = checkAuth