const { validationResult } = require("express-validator")
const Task = require("../model/task_model")
const HttpError = require("../model/http_error")
const Project = require("../model/project_model")
const Team = require("../model/team_model")
const User = require("../model/user_model")

const addTask = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return next(new HttpError("Invalid input", 422, errors.array()))
    }


    const { name,
        project,
        team,
        owners,
        tags,
        timeToComplete,
        status,
        dueDate,
        priority
    } = req.body

    const isExistProject = await Project.findById(project)

    if (!isExistProject) {
        return next(new HttpError(`No project found with ${project} id.`, 404))
    }
    const isExistTeam = await Team.findById(team)

    if (!isExistTeam) {
        return next(new HttpError(`No team found with ${team} id.`, 404))
    }




    const task = new Task({
        name,
        project,
        team,
        owners,
        tags,
        timeToComplete,
        status,
        dueDate,
        priority
    })

    try {
        const savedTask = await task.save()
        res.status(201).json({ task: savedTask.toObject({ getters: true }) })


    } catch (error) {
        next(error)
    }
}

const getTasks = async (req, res, next) => {

    const { name, owners, team, tags, project, status } = req.query
    let filter = {}

    if (tags) filter.tags = { $in: tags.split(",") }

    if (owners) filter.owners = owners
    if (team) filter.team = team
    if (project) filter.project = project
    if (name) filter.name = { $regex: name, $options: "i" }
    if (status) filter.status = status

    try {

        const tasks = await Task.find(filter).populate("owners").populate("project").populate("team").sort({ createdAt: -1 })

        res.status(200).json({ tasks: tasks.map(task => task.toObject({ getters: true })) })
    } catch (error) {
        next(error)
    }
}

const taskDetails = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return next(new HttpError("Task id must be present.", 400, errors.array()))
    }

    const taskId = req.params.id

    try {

        const tasks = await Task.findById(taskId).populate("owners").populate("project").populate("team")

        res.status(200).json({ task: tasks.toObject({ getters: true }) })
    } catch (error) {
        next(error)
    }
}

const updateTask = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError("Invalid task status.", 422, errors.array()));
    }


    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!task) {
            return next(new HttpError("Task not found", 404));
        }

        res.status(200).json({
            task: task.toObject({ getters: true })
        });
    } catch (error) {
        next(error);
    }
};

const deleteTask = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(
            new HttpError("Invalid task id.", 422, errors.array())
        );
    }

    try {
        const task = await Task.findById(req.params.id);

       

        if (!task) {
            return next(new HttpError("Task not found", 404));
        }

        await task.deleteOne();

        res.status(200).json({
            message: "Task deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};



module.exports = { addTask, getTasks, taskDetails, updateTask, deleteTask }