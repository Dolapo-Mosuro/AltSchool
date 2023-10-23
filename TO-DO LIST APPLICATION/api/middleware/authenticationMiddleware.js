function checkAuth(req, res, next) {
	const token = req.header("Authorization");

	if (!token) {
		return res.status(401).json({ message: "Authentication failed" });
	}

	try {
		const decoded = jwt.verify(token, "your-secret-key");
		req.userData = decoded;
		next();
	} catch (error) {
		console.error(error);
		res.status(401).json({ message: "Authentication failed" });
	}
}
