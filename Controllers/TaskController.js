const Task = require("../Models/TaskSchema");

exports.createTask = async (req, res) => {
    try {
        const { title, description, priority } = req.body;
        const newTask = new Task({ title, description, priority, user: req.userId });
        await newTask.save();
        res.json(newTask);
    } catch (error) {
        res.status(500).json({ message: "Error creating task" });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.userId });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks" });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Error updating task" });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task" });
    }
};

exports.toggleTaskStatus = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Error updating task status" });
    }
};
