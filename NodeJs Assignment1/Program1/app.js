const path = require("path");
const os = require("os");
const process = require("process");

// const filePath = "Week2/my_file.js";
// console.log("File Path Separator:", path.sep);

// const filePath = path.sep;
// console.log(filePath);

// // const userInfo = os.userInfo();
// // console.log("User Information:");
// // console.log("Username:", userInfo.username);
// console.log("Home Directory:", userInfo.homedir);

// 1. Print out the current working directory
const currentWrkDir = process.cwd();
console.log(currentWrkDir);

// 2. Print out the separator of a given file path
const filePath = "C:UsersDocumentsALT-SchoolNodeJs Assignment1my_file.js";
const fileSeperator = path.sep;
console.log(fileSeperator);

// 3. Print out the extension name of a file path
const fileExtension = path.extname(
	"C:UsersDocumentsALT-SchoolNodeJs Assignment1my_file.js"
);
console.log(fileExtension);

// 4. Print out the process id of the current running process
const processId = process.pid;
console.log(processId);

// 5. Print out the user information of the os
const userInfo = os.userInfo();
console.log("User Information:");
console.log(userInfo);

// 6. Print out the platform of an operating system
console.log(os.platform());
