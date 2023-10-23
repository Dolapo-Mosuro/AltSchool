const mongoose = require("mongoose");
const { MONGO_URI } = process.env; // You should set this environment variable

mongoose.connect(MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Listen for the MongoDB connection event
mongoose.connection.on("connected", () => {
	console.log("Connected to MongoDB");
});

// Handle any MongoDB connection errors
mongoose.connection.on("error", (err) => {
	console.error("MongoDB connection error:", err);
});

module.exports = mongoose;
