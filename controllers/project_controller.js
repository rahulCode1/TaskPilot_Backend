const Project = require("../model/project_model")
const HttpError = require("../model/http_error")
const { validationResult } = require("express-validator")
const Task = require("../model/task_model")



const addProject = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return next(new HttpError("Invalid input data.", 422, errors.array()))
    }
    const { name, description } = req.body



    try {

        const isExisting = await Project.findOne({ name })

        if (isExisting) {
            return next(new HttpError(`(${isExisting.name}) name already exist.`, 409))
        }

        const project = new Project({ name, description })
        const savedProject = await project.save()
        res.status(201).json({ project: savedProject.toObject({ getters: true }) })

    } catch (error) { next(error) }
}

const getProjectDetails = async (req, res, next) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return next(new HttpError("Project id must be present.", 400, errors.array()))
    }
    const projectId = req.params.id
    try {

        const project = await Project.findById(projectId)

        const tasks = await Task.find({ project: projectId }).populate("project").populate("owners")

        res.status(200).json({ tasks: tasks.map(task => task.toObject({ getters: true })), project: project.toObject({ getters: true }) })
    } catch (error) {
        next(error)
    }
}
const getAllProjects = async (req, res, next) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 })
      
       
        res.status(200).json({ projects: projects.map(project => project.toObject({ getters: true })) })
    } catch (error) {
        next(error)
    }
}

const deleteProject = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(
            new HttpError("Invalid task id.", 422, errors.array())
        );
    }

    try {
        const project = await Project.findById(req.params.id);



        if (!project) {
            return next(new HttpError("project not found", 404));
        }

        await project.deleteOne();

        res.status(200).json({
            message: "project deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};


module.exports = { addProject, getProjectDetails, getAllProjects, deleteProject }