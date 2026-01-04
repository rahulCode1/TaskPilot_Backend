const mongoose = require('mongoose');
// Team Schema
const teamSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // T
    // eam names must be unique
    description: { type: String }, // Optional description for the team
    createdAt: {type: Date, default: Date.now()} 
}, {timestamps: true});
module.exports = mongoose.model('Team', teamSchema);
