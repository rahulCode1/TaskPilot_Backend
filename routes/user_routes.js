const express = require("express")
const router = express.Router()
const { check } = require("express-validator")
const { signup, login, getAllUsers } = require("../controllers/user_controller")
const authCheck = require("../middleware/checkAuth")


const signupValidation = [
    check("name").trim().notEmpty().withMessage("User name must be present."),
    check("email").trim().normalizeEmail().isEmail().withMessage("Please enter valid email."),
    check("password").trim().notEmpty().withMessage("Password must be present")
]
const loginValidation = [

    check("email").trim().normalizeEmail().isEmail().withMessage("Please enter valid email."),
    check("password").trim().notEmpty().withMessage("Password must be present")
]

router.post("/signup", signupValidation, signup)
router.post("/login", loginValidation, login)
router.get("/", getAllUsers)

module.exports = router