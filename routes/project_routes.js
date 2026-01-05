const express = require("express")
const router = express.Router()
const { check, param } = require("express-validator")
const { addProject, getProjectDetails, getAllProjects } = require("../controllers/project_controller")
const authCheck = require("../middleware/checkAuth")



const projectValidation = [
    check("name").trim().notEmpty().withMessage("Name must be present.").isLength({ min: 2 }).withMessage("Name must be at least 2 characters long"),
    check("description").optional().isString().withMessage("Description must be string")
]

const projectDetailsValidation = [
    param("id").isMongoId().withMessage("Project must be valid id.")
]




router.post("/", projectValidation, addProject)
router.get("/", getAllProjects)
router.get("/:id", projectDetailsValidation, getProjectDetails)

module.exports = router 