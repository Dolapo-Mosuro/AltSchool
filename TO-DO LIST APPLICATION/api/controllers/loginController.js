// Login Controller
async function loginUser(req, res) {
	const { username, password } = req.body;

	try {
		// Find the user by username
		const user = await User.findOne({ username });

		if (!user) {
			return res.status(401).json({ message: "Authentication failed" });
		}

		// Compare the provided password with the hashed password in the database
		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			return res.status(401).json({ message: "Authentication failed" });
		}

		// Generate a JWT token for the user
		const token = jwt.sign({ userId: user._id }, jwtSecret, {
			expiresIn: "1h",
		});

		res.status(200).json({ token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Login failed" });
	}
}
