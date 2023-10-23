// tests/createTask.test.js
const request = require("supertest");
const app = require("../app"); // Import your Express application

describe("POST /tasks", () => {
	it("should create a new task", async () => {
		const taskData = {
			title: "Test Task",
			description: "This is a test task.",
		};

		const response = await request(app)
			.post("/tasks")
			.set("Authorization", `Bearer ${yourAccessToken}`) // Include your user's access token
			.send(taskData);

		expect(response.status).toBe(201);
		expect(response.body.title).toBe("Test Task");
	});
});
