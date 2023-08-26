const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, "users.json");

const authenticate = (req, res, next) => {
	const apiKey = req.headers["x-api-key"];

	if (!apiKey) {
		return res.status(401).json({ error: "API key required" });
	}

	const usersData = JSON.parse(fs.readFileSync(usersFilePath));
	const user = usersData.users.find((u) => u.apiKey === apiKey);

	if (!user) {
		return res.status(401).json({ error: "Invalid API key" });
	}

	req.user = user;
	next();
};

module.exports = { authenticate };
