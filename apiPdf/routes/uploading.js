const express = require("express");
const app = express();
const fs = require('fs');
const mongoose = require("mongoose");
const path = require('path'); 
//router.use(express.json());
const router = require("express").Router();
const cors = require("cors");
router.use(cors());
router.use("/files", express.static("files"));
//mongodb connection----------------------------------------------
const mongoUrl =
  "mongodb://localhost:27017/TunisiaSocialBook";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));
//multer------------------------------------------------------------
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
//const User = require("../models/User");

//const PdfSchema = mongoose.model('PdfDetails', pdfDetailsSchema);

const PdfSchema = require("../models/pdfDetails");
//mongoose.model("PdfDetails");
const upload = multer({ storage: storage });

router.post("/upload-files", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const title = req.body.title;
  const fileName = req.file.filename;
  try {
    await PdfSchema.create({ title: title, pdf: fileName });
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

router.get("/get-files", async (req, res) => {
  try {
    PdfSchema.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {}
});

//apis----------------------------------------------------------------
router.get("/", async (req, res) => {
  res.send("Success!!!!!!");
});

//const express = require('express');
//const app = express();

// Define a route to handle file downloads
/*router.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = __dirname + './files/' + filename; // Provide the path to the file

  res.download(filePath, (err) => {
    if (err) {
      // Handle error
      res.status(404).send('File not found.');
    }
  });
});*/ 
/*const fs = require('fs');

router.get('/download/:filename', (req, res) => {
  //const filename = req.params.filename;
  //const filePath = "./uploading/" + filename;
  const filename = 'example.pdf';
  const folderName = '/files/';
  const filePath = path.join(__dirname, folderName, filename);

  res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment; filename="${filename}"`,
  });

  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
});*/

router.get('/api/PdfFiles/:filename', (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join(__dirname, './files/', fileName);
    
    res.sendFile(filePath);
  });

router.get('/download/:pdf', (req, res) => {
    try {
      //pdf='';
      const  pdf = req.params.filename;
      const filePath = path.join(__dirname, './PdfFiles/', pdf);
      const folderName = 'PdfFiles\'';

      //const filePath = path.join('http:\\localhost:8800\api\files\'', pdf);
      //'C:\Users\USER\OneDrive\Documents\Tunisia SocialBook\api\files\'
      //path.join('C:\Users\USER\OneDrive\Documents\Tunisia SocialBook\api\'', folderName, pdf);
      //C:\Users\USER\OneDrive\Documents\Tunisia SocialBook\api\files\'
      //
       
      // Check if the file exists
      if (!fs.existsSync(filePath)) {
        res.status(404).json({ error: 'File not found' });
        return;
      }
  
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${pdf}"`,
      });
  
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } catch (error) {
      console.error('Internal server error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  const pdf = require('pdf-parse');
 // const fs = require('fs');
  const Stylometry = require('../models/Stylometry');
  
  // Endpoint for stylometry analysis
  router.post('/analyze', async (req, res) => {
    const { filename } = req.body;
  
    try {
      // Read the PDF file
      const data =  fs.readFileSync(`/api/PdfFiles/${filename}`);
      //router.use('/api/PdfFiles', express.static(path.join(__dirname, 'PdfFiles')));
     
      
      // Perform stylometry analysis using the pdf-parse library
      const text = await pdf(data);
      const { text: extractedText } = text;
  
      // Perform your stylometry analysis logic here
      // Calculate word frequencies, sentence lengths, vocabulary size, etc.
      const calculatedWordFrequencies = calculateWordFrequencies(extractedText);
      const calculatedSentenceLengths = calculateSentenceLengths(extractedText);
      const calculatedVocabularySize = calculateVocabularySize(extractedText);
  
      // Create a new Stylometry instance and save the analysis results
      const stylometry = new Stylometry({
        filename,
        wordFrequencies: calculatedWordFrequencies,
        sentenceLengths: calculatedSentenceLengths,
        vocabularySize: calculatedVocabularySize,
      });
      await stylometry.save();
  
      res.status(200).json({ message: 'Stylometry analysis completed and saved.' });
    } catch (error) {
      console.error('Error performing stylometry analysis:', error);
      res.status(500).json({ error: 'An error occurred during stylometry analysis.' });
    }
  });
  
  function calculateWordFrequencies(text) {
    // Convert the text to lowercase and remove punctuation
    const cleanedText = text.toLowerCase().replace(/[^\w\s]|_/g, '').replace(/\s+/g, ' ');
  
    // Split the cleaned text into words
    const words = cleanedText.split(' ');
  
    // Count the frequency of each word
    const wordFrequencies = {};
    for (const word of words) {
      if (word in wordFrequencies) {
        wordFrequencies[word] += 1;
      } else {
        wordFrequencies[word] = 1;
      }
    }
  
    return wordFrequencies;
  }
  
  function calculateSentenceLengths(text) {
    // Split the text into sentences using a simple approach
    const sentences = text.split(/[.!?]+/);
  
    // Calculate the length of each sentence
    const sentenceLengths = sentences.map((sentence) => sentence.trim().split(' ').length);
  
    return sentenceLengths;
  }
  
  function calculateVocabularySize(text) {
    // Convert the text to lowercase and remove punctuation
    const cleanedText = text.toLowerCase().replace(/[^\w\s]|_/g, '').replace(/\s+/g, ' ');
  
    // Split the cleaned text into words
    const words = cleanedText.split(' ');
  
    // Create a Set to store unique words
    const vocabulary = new Set(words);
  
    // Return the size of the vocabulary
    return vocabulary.size;
  }
  
  module.exports = router;  


// Start the server
/*app.listen(3000, () => {
  console.log('Server is running on port 3000');
});*/

module.exports = router;
