// Register Controller
const User = require("./models/user"); // Assuming you have a User model
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
	const { username, password } = req.body;

	try {
		// Check if the username is already in use
		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(400).json({ message: "Username is already taken" });
		}

		// Hash the password before saving it to the database
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user in the database
		const newUser = new User({ username, password: hashedPassword });
		await newUser.save();

		// Generate a JWT token for the user
		const token = jwt.sign({ userId: newUser._id }, "your-secret-key", {
			expiresIn: "1h",
		});

		res.status(201).json({ token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Registration failed" });
	}
}
