const express = require("express")
const router = express.Router()
const { addTags, getAllTags } = require("../controllers/tag_controller")
const { check } = require("express-validator")
const authCheck = require("../middleware/checkAuth")

const tagValidation = [
    check("name").trim().notEmpty().withMessage("Name must be present.").isLength({ min: 2 }).withMessage("Name must be at least 2 characters long"),

]


router.post("/",authCheck, tagValidation, addTags)
router.get("/", getAllTags)

module.exports = router 