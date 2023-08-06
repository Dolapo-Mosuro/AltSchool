const fs = require("fs");
const path = require("path");

// Task 1: Create directory/folder named: “Students”
const createFolder = path.join(__dirname, "Students");
// fs.mkdir("Students", (err) => {
// 	if (err) {
// 		console.log("Error creating directory:", err);
// 		return;
// 	}
// 	console.log("Directory created successfully");
// });

// // Task 2: In the Students directory, create a file named user.js
// const createFile = path.join("Students", "user.js");
// fs.writeFile(createFile, "", (err) => {
// 	if (err) {
// 		console.log("Error creating file:", err);
// 		return;
// 	}
// 	console.log("File created successfully");
// });

// Task 3: Update the Students directory to “Names”
//
const renamedFolder = path.join(__dirname, "Students");
const destinationFolder = path.join(__dirname, "Names");

fs.rename(renamedFolder, destinationFolder, (err) => {
	if (err) {
		console.error("Error renaming directory:", err);
		return;
	}
	console.log('Directory renamed to "Names"');
});

// // Task 4: Add your name as content to the file user.js
// const nameContent = "Your Name: Dolapo Mosuro\n";
// fs.writeFile("Names/user.js", nameContent, (err) => {
// 	if (err) {
// 		console.error("Error writing to file:", err);
// 		return;
// 	}
// });
// // Task 5: Update the file and add more information about yourself
// const additionalInfo =
// 	"Age: 30\nSex: Male\nNationality: US\nPhone: 123-456-7890\n";
// fs.appendFileSync("Names/user.js", additionalInfo);

// // Task 6: Update the file user.js to {your_name}.js (e.g., john_doe.js)
// const newName = "john_doe.js";
// fs.renameSync("Names/user.js", `Names/${newName}`);

// // Task 7: Read the contents from {your_name}.js using fs.readFile
// fs.readFile(`Names/${newName}`, "utf8", (err, data) => {
// 	if (err) {
// 		console.error("Error reading file:", err);
// 		return;
// 	}
// 	console.log("File Contents:", data);
// });

// // Task 8: Delete the file {your_name}.js
// fs.unlinkSync(`Names/${newName}`);

// // Task 9: Delete the directory “Names”
// fs.rmdirSync("Names");
