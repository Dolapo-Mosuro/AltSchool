const express = require("express");
const { userRouter } = require("./userRoutes");
const { apiRouter } = require("./apiRoutes");

const app = express();
const port = 3001;

app.use(express.json());

app.use("/user", userRouter);
app.use("/api", apiRouter);

app.listen(port, () => {
	console.log(`Your Server is live on port: ${port}`);
});
