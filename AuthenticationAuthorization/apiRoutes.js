const express = require("express");
const fs = require("fs");
const path = require("path");
const { authenticate } = require("./authMiddleware");
const itemsPath = path.join(__dirname, "items.json");

const apiRouter = express.Router();

apiRouter.use(authenticate);

apiRouter.get("/items", (req, res) => {
	const usersData = JSON.parse(fs.readFileSync(usersFilePath));
	const user = usersData.users.find(
		(u) => u.apiKey === req.headers["x-api-key"]
	);

	if (user.role !== "user") {
		return res.status(403).json({ error: "Forbidden" });
	}

	const itemsData = JSON.parse(fs.readFileSync(itemsPath));
	res.status(200).json({ data: itemsData });
});

// Implement routes for creating, updating, and deleting items
// Ensure that only users with 'admin' role can access these routes

module.exports = { apiRouter };
