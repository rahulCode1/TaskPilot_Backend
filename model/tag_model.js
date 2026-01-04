const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // Tag names must be unique
    createdAt: {type: Date, default: Date.now()}
}, {timestamps: true});
module.exports = mongoose.model('Tag', tagSchema);
