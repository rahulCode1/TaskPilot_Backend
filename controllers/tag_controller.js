const Tag = require("../model/tag_model")
const { validationResult } = require("express-validator")
const HttpError = require("../model/http_error")

const addTags = async (req, res, next) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return next(new HttpError("Invalid input credentials.", 422, errors.array()))

    }

    const { name } = req.body

    try {

        const isExisting = await Tag.findOne({ name })




        if (isExisting) {
            return next(new HttpError(`(${isExisting.name}) name already exist, Please choose different name for tag.`, 409))
        }



        const tag = new Tag({ name })
        const savedTag = await tag.save()
        res.status(201).json({ tag: savedTag.toObject({ getters: true }) })

    } catch (error) { next(error) }

}

const getAllTags = async (req, res, next) => {
    try {
        const tags = await Tag.find().select("name")
        res.status(200).json({ tags: tags.map(team => team.toObject({ getters: true })) })
    } catch (error) {
        next(error)
    }
}

module.exports = { addTags, getAllTags }