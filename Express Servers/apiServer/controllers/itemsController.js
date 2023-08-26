const fs = require("fs");
const path = require("path");

const itemsPath = path.join(__dirname, "../items.json");

let items = [];

const loadItems = () => {
	try {
		const fileItems = fs.readFileSync(itemsPath, "utf8");
		items = JSON.parse(fileItems);
	} catch (error) {
		console.error("Error loading items from disk:", error.message);
		items = [];
	}
};

const saveItems = () => {
	try {
		fs.writeFileSync(itemsPath, JSON.stringify(items, null, 2), "utf8");
		console.log("Items saved to disk.");
	} catch (error) {
		console.error("Error saving items to disk:", error.message);
	}
};

const getItems = () => {
	return items;
};

const getItemById = (id) => {
	return items.find((item) => item.id === id);
};

const addItem = (item) => {
	items.push(item);
	saveItems();
};

const updateItem = (id, newData) => {
	const index = items.findIndex((item) => item.id === id);
	if (index !== -1) {
		items[index] = { ...items[index], ...newData };
		saveItems();
	}
};

const deleteItem = (id) => {
	const index = items.findIndex((item) => item.id === id);
	if (index !== -1) {
		items.splice(index, 1);
		saveItems();
	}
};

module.exports = {
	loadItems,
	getItems,
	getItemById,
	addItem,
	updateItem,
	deleteItem,
};
