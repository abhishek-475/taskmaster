const express = require("express");
const taskController = require("../Controllers/TaskController");
const jwt = require("../Middlewares/jwtmidleware");

const router = express.Router();

router.post("/", jwt, taskController.createTask);
router.get("/", jwt, taskController.getTasks);
router.put("/:id", jwt, taskController.updateTask);
router.delete("/:id", jwt, taskController.deleteTask);
router.patch("/:id/status", jwt, taskController.toggleTaskStatus);

module.exports = router;
