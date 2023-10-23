const express = require("express");
const itemsRoutes = require("./routes/itemsRoutes");

const app = express();
const port = 3000;

app.use(express.json());
app.use("/items", itemsRoutes);

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});
