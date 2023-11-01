
const express = require("express");
const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;
//require("../models/PdfDetails");
//require("./model");
//const File = mongoose.model("file");
const router = express.Router();

const storage = multer.diskStorage({
  destination: ".\public\images",
  filename: function (req, file, cb) {
    cb(null, "PDF-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000000000 },
}).single("pdfFile");

const uploadPDF = (req, res) => {
  upload(req, res, () => {
    console.log("Request ---", req.body);
    console.log("Request file ---", req.file); // Here you get the file.
    const file = new File();
    file.meta_data = req.file;
    file.save().then(() => {
      res.send({ message: "Uploaded successfully" });
    }).catch((error) => {
      console.error("Error saving file:", error);
      res.status(500).json({ error: "Failed to upload file" });
    });
  });
};

router.post("/upload", uploadPDF);

app.use(router);

app.get("/", (req, res) => {
  return res.send("<p>Hello!</p>");
});

mongoose
  .connect("mongodb://localhost:27017/TunisiaSocialBook", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB is connected");
    app.listen(PORT, () => {
      console.log("\u{1F525}\u{1F680} App listening on port", PORT, "\u{1F525}\u{1F680}");
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
  module.exports = router;

/*const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const File = require('./models/File');
const router = require("express").Router();
// Set up Express.js app
const app = express();

// Set up Multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/TunisiaSocialBook', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Define route for file upload
router.post('/upload', upload.single('pdf'), (req, res) => {
 // const { originalname, mimetype, buffer } = req.file;

  const file = new File({
    filename:  String,
    contentType: String,
    data: Buffer
  });

  file.save()
    .then(() => {
      res.send('File uploaded successfully');
    })
    .catch((err) => {
      console.error('Error uploading file:', err);
      res.status(500).send('Error uploading file');
    });
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});*/