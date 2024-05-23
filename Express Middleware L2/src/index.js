const express = require("express");
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const server = express();
cloudinary.config({ //setting up cloudinary and accessing it
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = multer.diskStorage({ //storing the uploaded files in "uploads" 
  destination: (req, file, cb) => {
    cb(null, "uploads/"); //null means that there is no error
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); //file.originalname saves the files in original format. Example ".jpg"
  },
});

const upload = multer({ storage: storage });

server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

server.post("/upload", upload.single("file"), (req, res) => {
  if (req.file) {
    const filePath = req.file.path;

    //upload the files in cloudinary, we get promise as response and resolve the promise to get the url of image
    cloudinary.uploader
      .upload(filePath, { resource_type: "image" })
      .then((result) => {
        res.status(200).json({
          message: "file uploaded successfully",
          imageUrl: result.secure_url, //gives the url of the image uploaded
        });
      })
      .catch((error) => {
        res.json({
          message: "file upload to Cloudinary failed",
          error: error.message,
        });
      });
  } else {
    res.status(400).json({
      message: "file upload failed",
    });
  }
});

server.listen(3000, () => {
  console.log("Server is running");
});
