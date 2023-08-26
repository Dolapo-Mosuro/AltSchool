const express = require("express");
const itemsController = require("../controllers/itemsController");

const router = express.Router();

router.get("/", (req, res) => {
	const items = itemsController.getItems();
	res.json({ data: items });
});

router.get("/:id", (req, res) => {
	const id = req.params.id;
	const item = itemsController.getItemById(id);
	if (item) {
		res.json({ data: item });
	} else {
		res.status(404).json({ error: "Item not found" });
	}
});

router.post("/", (req, res) => {
	const newItem = {
		...req.body,
		id: Math.floor(Math.random() * 20).toString(),
	};
	itemsController.addItem(newItem);
	res.status(201).json({ data: newItem });
});

router.patch("/:id", (req, res) => {
	const id = req.params.id;
	const newData = req.body;
	itemsController.updateItem(id, newData);
	res.json({ message: "Item updated successfully" });
});

router.delete("/:id", (req, res) => {
	const id = req.params.id;
	itemsController.deleteItem(id);
	res.json({ message: "Item deleted successfully" });
});

module.exports = router;
