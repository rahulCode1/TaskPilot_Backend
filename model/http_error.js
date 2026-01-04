class HttpError extends Error {
    constructor(message, statuscode, errors = null) {
        super(message),
            this.statuscode = statuscode,
            this.errors = errors
    }
}

module.exports = HttpError