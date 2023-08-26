const express = require("express");
const fs = require("fs");
const path = require("path");
const { authenticate } = require("./authMiddleware");
const usersFilePath = path.join(__dirname, "users.json");

const userRouter = express.Router();

userRouter.post("/create", (req, res) => {
	const { username, password, role } = req.body;

	const usersData = JSON.parse(fs.readFileSync(usersFilePath));
	const existingUser = usersData.users.find((u) => u.username === username);

	if (existingUser) {
		return res.status(400).json({ error: "Username already exists" });
	}

	const newUser = { username, password, role, apiKey: generateApiKey() };
	usersData.users.push(newUser);
	fs.writeFileSync(usersFilePath, JSON.stringify(usersData, null, 2));

	res.status(201).json({ message: "User created successfully" });
});

function generateApiKey() {
	// Generate and return a unique API key
	// You can use a library to generate a secure API key
}

module.exports = { userRouter };
