const router = require("express").Router();
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

//const router = require("express").Router();
//const File = require("../models/PdfDetails");
const PORT = 8800;
//router.use(express.json());
//router.use(express.urlencoded({ extended: true }));
const storage = multer.diskStorage({
  destination: "./public/images/",
  filename: function (req, file, cb) {
    cb(null, "PDF-" + Date.now() + ".pdf");
  },
});

const upload = multer({
  storage: storage,
 //limits:'111111111111111111111111111'
}).single("pdfFile");

router.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error("Error uploading file:", err);
      return res.status(500).json({ error: "Failed to upload file" });
    }

    console.log("Request file ---", req.file); // Here you get the file details

    return res.json({ message: "Uploaded successfully" });
  });
});

router.get("/files", (req, res) => {
  fs.readdir("./public", (err, files) => {
    if (err) {
      console.error("Error reading files:", err);
      return res.status(500).json({ error: "Failed to retrieve files" });
    }

    return res.json({ files });
  });
});

router.get("/files/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = `./public/${fileName}`;

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Failed to retrieve file" });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.send(data);
  });
});

router.delete("/files/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = `./public/images/${fileName}`;

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
      return res.status(500).json({ error: "Failed to delete file" });
    }

    return res.json({ message: "File deleted successfully" });
  });
});
/*app.listen(8800, () => {
  console.log("Backend server is running!");
});*/ 
//const express = require('express');
//const multer = require('multer'); // Middleware for handling multipart/form-data
//const app = express();

// Configure multer middleware to handle file uploads
const storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination directory where the uploaded files will be stored
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    // Set the filename for the uploaded file
    cb(null, Date.now() + '-' + file.originalname);
  }
});

/*const upload = multer({ storage: storage });

// Define the route for file uploads
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // File upload was successful
  // Access the uploaded file details via req.file
  console.log('File uploaded:', req.file);
  res.status(200).json({ message: 'File uploaded successfully' });
});*/

// Start the server
/*app.listen(3000, () => {
  console.log('Server is running on port 3000');
});*/

module.exports = router;