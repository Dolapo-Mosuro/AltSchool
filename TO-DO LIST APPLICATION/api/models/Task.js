// In your routes file (e.g., tasksRoutes.js)
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Task = require("./models/task"); // Import your Task model

// Render the to-do list
router.get("/tasks", async (req, res) => {
	const tasks = await Task.find(); // Fetch tasks from the database
	res.render("index", { tasks });
});

// Render the task creation form
router.get("/tasks/create", (req, res) => {
	res.render("createTask");
});

const taskSchema = new mongoose.Schema({
	title: String,
	description: String,
	state: {
		type: String,
		enum: ["pending", "completed", "deleted"],
		default: "pending",
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User", // Reference to the User model
	},
});

const Task = mongoose.model("Task", taskSchema);

module.exports = router;
module.exports = Task;
