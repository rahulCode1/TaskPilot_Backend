const { validationResult } = require("express-validator")
const Team = require("../model/team_model")
const Task = require("../model/task_model")
const HttpError = require("../model/http_error")

const addTeam = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return next(new HttpError("Invalid input credentials.", 422, errors.array()))
    }
    const { name, description } = req.body
    try {

        const isExisting = await Team.findOne({ name })

        if (isExisting) {
            return next(new HttpError(`(${isExisting.name}) name already exist.`, 409))
        }

        const team = new Team({ name, description })
        const savedTeam = await team.save()
        res.status(201).json({ team: savedTeam.toObject({ getters: true }) })

    } catch (error) { next(error) }
}

const getTeams = async (req, res, next) => {

    try {
        const teams = await Team.find().sort({ createdAt: -1 })
        res.status(200).json({ teams: teams.map(team => team.toObject({ getters: true })) })
    } catch (error) {
        next(error)
    }
}

const deleteTeam = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return next(new HttpError("Team id must be present & valid.", 400, errors.array()))
    }
    const teamId = req.params.id
    try {

        const deleteTeam = await Team.findByIdAndDelete(teamId)

        if (deleteTeam) {
            res.status(200).json({ message: "Team deleted successfully." })
        } else {
            return next(new HttpError("No team found with that id", 400))
        }
    } catch (error) {
        next(error)
    }
}

const getTeamDetails = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return next(new HttpError("Team id must be present & valid.", 400, errors.array()))
    }
    const teamId = req.params.id



    try {

        const team = await Team.findById(teamId)
        const tasks = await Task.find({ team: teamId }).populate("project").populate("owners").populate("team")

        res.status(200).json({ tasks: tasks.map(task => task.toObject({ getters: true })), team: team.toObject({ getters: true }) })
    } catch (error) {
        next(error)
    }
}

module.exports = { addTeam, getTeams, deleteTeam, getTeamDetails }