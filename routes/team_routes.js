const express = require("express")
const router = express.Router()
const { addTeam, getTeams, deleteTeam, getTeamDetails } = require("../controllers/team_controller")
const { check, param } = require("express-validator")
const authCheck = require("../middleware/checkAuth")


const teamValidation = [
    check("name").trim().notEmpty().withMessage("Name must be present.").isLength({ min: 2 }).withMessage("Name must be at least 2 characters long"),
    check("description").optional().isString().withMessage("Description must be string")
]

const idValidation = [
    param("id").isMongoId().withMessage("Team id must be present.")
]

router.post("/", authCheck, teamValidation, addTeam)
router.get("/", getTeams)
router.get("/:id", idValidation, getTeamDetails)
router.delete("/:id", authCheck, idValidation, deleteTeam)

module.exports = router 