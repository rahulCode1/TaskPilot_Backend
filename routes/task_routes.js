const express = require("express")
const router = express.Router()
const { check, param } = require("express-validator")
const { addTask, getTasks, taskDetails, updateTask, deleteTask } = require("../controllers/task_controller")
const authCheck = require("../middleware/checkAuth")


const taskValidation = [
    check("name").trim().notEmpty().withMessage("Name must be present."),
    check("project").exists({ checkNull: true }).isMongoId().withMessage("Must be valid project id."),
    check("team").exists({ checkNull: true }).isMongoId().withMessage("Must be valid team id."),
    check("owners").exists({ checkNull: true }).withMessage("Owners id must be present").isArray({ min: 1 }).withMessage("Owners must be an array."),
    check("owners.*").isMongoId().withMessage("Each owners must be valid objectId."),
    check("tags").isArray().withMessage("Tags must be an array"),
    check("timeToComplete").exists({ checkNull: true }).withMessage("timeToComplete is required").isFloat({ min: 1 }).withMessage("Minimum value must be 1."),
    check("status").trim().isIn(['To Do', 'In Progress', 'Completed', 'Blocked']).withMessage("Status must be: 'To Do', 'In Progress', 'Completed', 'Blocked'")
]

const idValidation = [
    param("id").isMongoId().withMessage("Task id must be present.")
]

router.post("/", authCheck, taskValidation, addTask)
router.get("/", getTasks)
router.get("/:id", idValidation, taskDetails)
router.delete("/:id", authCheck, idValidation, deleteTask)
router.patch("/:id", authCheck, idValidation, updateTask)

module.exports = router