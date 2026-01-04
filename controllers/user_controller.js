const { validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const HttpError = require("../model/http_error")
const User = require("../model/user_model")

const signup = async (req, res, next) => {

    const err = validationResult(req)

    if (!err.isEmpty()) {
        return next(new HttpError("Invalid input data", 422, err.array()))
    }
    const { name, email, password } = req.body
    try {

        const isExist = await User.findOne({ email })

        if (isExist) {
            return next(new HttpError(`User already exist.`, 409))
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = new User({
            name,
            email,
            password: hashedPassword
        })

        await user.save()
        res.status(201).json({ success: true, message: "User added successfully.", user: { id: user._id, email: user.email } })
    } catch (error) {
        next(error)
    }
}


const login = async (req, res, next) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return next(new HttpError("Invalid input credentials", 401, errors.array()))
    }

    const { email, password } = req.body
    try {

        const user = await User.findOne({ email })

        if (!user) {
            return next(new HttpError(`User doesn't exist.`, 404))
        }

        const isValidPassword = await bcrypt.compare(
            password, user.password

        )



        if (!isValidPassword) {
            return next(new HttpError("Invalid credentials, Please enter valid email & password.", 401))
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' }
        )

        res.status(200).json({ message: "User login successfully.", userId: user.id, token })

    } catch (error) { next(error) }
}

const getAllUsers = async (req, res, next) => {

    try {

        const users = await User.find().select("name email")
        res.status(200).json({ success: true, users: users.map(user => user.toObject({ getters: true })) })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    signup,
    login,
    getAllUsers
}