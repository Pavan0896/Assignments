const path = require("path");
const fs = require("fs");

const operation = process.argv[2];
const file = process.argv[3];
const content = process.argv[4];

switch (operation) {
  // read the file
  case "read":
    return fs.readFile(file, "utf-8", (err, data) => {
      if (err) {
        return console.log("Error is reading file");
      } else {
        return console.log(data);
      }
    });

    // append the file
  case "append":
    return fs.appendFile(file, "\n" + content + "\n", (err) => {  // "\n" ensures the text is appended to new line
      if (err) {
        return console.log("Error is appending file");
      } else {
        return console.log(`Content appended to the file ${file}`);
      }
    });

    // creating the file
  case "create":
    return fs.writeFile(file, "Initial Content", (err) => {  // file created with initial text content
      if (err) {
        return console.log("File not created");
      } else {
        return console.log(`File ${file} created`);
      }
    });

    // remove the file from directory
  case "delete":
    return fs.unlink(file, (err) => {
      if (err) {
        return console.log("error in deleting file");
      } else {
        return console.log(`File ${file} deleted`);
      }
    });

    // rename the file 
  case "rename":
    return fs.rename(file, content, (err) => {  // file renamed from "file" to anything written in content 
      if (err) {
        return console.log("File not renamed");
      } else {
        return console.log(`File ${file} renamed to ${content}`);
      }
    });

    //listing all the files present in directory
  case "list":
    return fs.readdir(path.dirname("Node.js File Editor"), (err, files) => {  //path.dirname(path) gives the present directory
      if (err) {
        return console.log("Error in listing files");
      } else {
        files.forEach((e) => {
          return console.log(e);
        });
      }
    });
  default:
    return console.log(`Invalid operation '${operation}'`);
}
