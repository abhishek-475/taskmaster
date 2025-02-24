const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    },
    priority: { 
        type: String, 
        enum: ["High", "Medium", "Low"], 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    }
})

const Task = mongoose.model('Task', TaskSchema)
module.exports = Task;