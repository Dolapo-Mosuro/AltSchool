// services/taskService.js
const Task = require("./models/task");

class TaskService {
	async createTask(title, description, user) {
		const newTask = new Task({ title, description, user });
		return await newTask.save();
	}

	async markTaskAsCompleted(taskId, user) {
		return await Task.findOneAndUpdate(
			{ _id: taskId, user },
			{ state: "completed" },
			{ new: true }
		);
	}

	async deleteTask(taskId, user) {
		return await Task.findOneAndDelete({ _id: taskId, user });
	}
}

module.exports = new TaskService();
