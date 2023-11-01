const mongoose = require("mongoose");

const PdfDetailsSchema = new mongoose.Schema(
  {
    pdf: String,
    title: String,
  },
  { collection: "PdfDetails" }
);
module.exports = mongoose.model("PdfDetails", PdfDetailsSchema);

//mongoose.model("PdfDetails", PdfDetailsSchema);


/*const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalname: { type: String, required: true },
  path: { type: String, required: true },
  size: { type: Number, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

const File = mongoose.model('File', fileSchema);

module.exports = File;*/
/*const mongoose = require('mongoose');

/**const fileSchema = new mongoose.Schema({
    meta_data:{}
});*/



/*const fileSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  data: String
});

const File = mongoose.model('File', fileSchema);

module.exports = File;*/