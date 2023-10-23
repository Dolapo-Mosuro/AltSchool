const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const Task = require("./models/task.js");
const checkAuth = require("../middleware/check-auth"); // Authentication middleware

// Create a new task
router.post("/tasks", checkAuth, async (req, res) => {
	const { title, description } = req.body;
	const user = req.userData.userId; // Get the user ID from the authenticated user

	try {
		const newTask = new Task({ title, description, user });
		await newTask.save();
		res.status(201).json(newTask);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Task creation failed" });
	}
});

// Mark a task as completed
router.patch("/tasks/:taskId", checkAuth, async (req, res) => {
	const taskId = req.params.taskId;
	const user = req.userData.userId; // Get the user ID from the authenticated user

	try {
		const updatedTask = await Task.findOneAndUpdate(
			{ _id: taskId, user },
			{ state: "completed" },
			{ new: true }
		);

		if (!updatedTask) {
			return res.status(404).json({ message: "Task not found" });
		}

		res.json(updatedTask);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Task update failed" });
	}
});

// Delete a task
router.delete("/tasks/:taskId", checkAuth, async (req, res) => {
	const taskId = req.params.taskId;
	const user = req.userData.userId; // Get the user ID from the authenticated user

	try {
		const deletedTask = await Task.findOneAndDelete({ _id: taskId, user });

		if (!deletedTask) {
			return res.status(404).json({ message: "Task not found" });
		}

		res.json(deletedTask);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Task deletion failed" });
	}
});

// Render the to-do list
router.get("/tasks", async (req, res) => {
	const tasks = await Task.find(); // Fetch tasks from the database
	res.render("index", { tasks });
});

// Render the task creation form
router.get("/tasks/create", (req, res) => {
	res.render("createTask");
});

// Handle task creation
router.post("/tasks", async (req, res) => {
	const { title, description } = req.body;
	try {
		// Create a new task in the database using the Task model
		const newTask = new Task({ title, description });
		await newTask.save();
		res.redirect("/tasks"); // Redirect back to the to-do list
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Task creation failed" });
	}
});

// Sort pending tasks
router.get("/tasks/pending", checkAuth, async (req, res) => {
	const user = req.userData.userId; // Get the user ID from the authenticated user

	try {
		const pendingTasks = await Task.find({ user, state: "pending" });
		res.json(pendingTasks);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error fetching pending tasks" });
	}
});

// Sort completed tasks
router.get("/tasks/completed", checkAuth, async (req, res) => {
	const user = req.userData.userId; // Get the user ID from the authenticated user

	try {
		const completedTasks = await Task.find({ user, state: "completed" });
		res.json(completedTasks);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error fetching completed tasks" });
	}
});
// In your route handlers
const taskService = require("../services/taskService");

router.post("/tasks", checkAuth, async (req, res) => {
	const { title, description } = req.body;
	const user = req.userData.userId;

	try {
		const newTask = await taskService.createTask(title, description, user);
		res.status(201).json(newTask);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Task creation failed" });
	}
});

router.patch("/tasks/:taskId", checkAuth, async (req, res) => {
	const taskId = req.params.taskId;
	const user = req.userData.userId;

	try {
		const updatedTask = await taskService.markTaskAsCompleted(taskId, user);

		if (!updatedTask) {
			return res.status(404).json({ error: "Task not found" });
		}

		res.json(updatedTask);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Task update failed" });
	}
});

router.delete("/tasks/:taskId", checkAuth, async (req, res) => {
	const taskId = req.params.taskId;
	const user = req.userData.userId;

	try {
		const deletedTask = await taskService.deleteTask(taskId, user);

		if (!deletedTask) {
			return res.status(404).json({ error: "Task not found" });
		}

		res.json(deletedTask);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Task deletion failed" });
	}
});

module.exports = router;
