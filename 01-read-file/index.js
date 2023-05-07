const { error } = require("console");
const fs = require("fs");
const path = require("path");

let fileAdress = path.join(__dirname, "text.txt");
const readStream = fs.createReadStream(fileAdress, "utf-8");

let data = "";
readStream.on("data", chunk => data += chunk);
readStream.on("end", () => console.log(data));
readStream.on("error", error => console.log("Error", error.message));