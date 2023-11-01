//import "./index.css";
import "./App.css";
//import Topbar from "../../components/topbar/Topbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { pdfjs } from "react-pdf";
import PdfComp from "./PdfComp";
//import pdfjs from 'pdfjs-dist/build/pdf.worker.min.js';
import React from 'react';
//pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",                                                  
  import.meta.url
).toString();

function UploadingPdf() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [allImage, setAllImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    getPdf();
  }, []);
  const getPdf = async () => {
    const result = await axios.get("uploading/get-files");
    console.log(result.data.data);
    setAllImage(result.data.data);
  };

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    console.log(title, file);

    const result = await axios.post(
      "uploading/upload-files",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(result);
    if (result.data.status == "ok") {                        
      alert("Uploaded Successfully!!!");
      getPdf();
    }
  };
  /*function downloadFile(url, fileName) {
    const link = document.createElement('a');
    url='C:\Users\USER\OneDrive\Documents\Tunisia SocialBook\api\files';
    link.href = url;
    link.download = '\''+fileName;
    link.target = '_blank'; // Optional, opens the file in a new tab
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }*/
  
  // Usage
  //const fileUrl = 'C:\Users\USER\OneDrive\Documents\Tunisia SocialBook\api\files';
  //const fileName = 'file.pdf';
  //downloadFile(fileUrl, fileName); 


  const handleDownload = async (pdf) => {
    const downloadUrl = await axios.get(`uploadingPdf/${pdf}`);
  
    try {
      const response = await fetch(downloadUrl, { method: 'GET' });
  
      if (!response.ok) {
        throw new Error(response.statusText);
      }
  
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = url;
      link.download = pdf;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download error:', error);
      // Handle the error here (e.g., show an error message to the user)
    }
  };
  
 // import axios from 'axios';
// import axios from 'axios';

 const handleDownload1 = async (pdf) => {
   try {
     const response = await axios.get(`/PdfFiles/${pdf}`, {
       responseType: 'blob', // Set the response type to 'blob' for file download
     });
     
     const url = window.URL.createObjectURL(new Blob([response.data]));
     const link = document.createElement('a');
     link.href = url;
     link.setAttribute('download', pdf);
     document.body.appendChild(link);
     link.click();
   } catch (error) {
     console.error('Error downloading file:', error);
   }
 };
 
 // Call the downloadFile function when needed


  const downloadFile = (filename) => {
    axios({
      url: `/api/PdfFiles/${filename}`,
      method: 'GET',
      responseType: 'blob', // Set the response type to 'blob' for file download
    })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    })
    .catch((error) => {
      console.error('Error downloading file:', error);
    });
  };

  const AnalyseFile = (filename) => {
    axios({
      url: `/api/PdfFiles/${filename}`,
      method: 'GET',
      responseType: 'blob', // Set the response type to 'blob' for file download
    })
    .then((response) => {
      /*const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();*/
    })
    .catch((error) => {
      console.error('Error downloading file:', error);
    });
  };
  







  

  /*const handleDownload = (pdf) => {
    const downloadUrl = `uploading/files/${pdf}`; // Replace with the appropriate Express.js route

    // Create a hidden download link and click it programmatically
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = pdf;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };*/


 
  
  
  





  const showPdf = (pdf) => {
    // window.open(`http://localhost:8800/files/${pdf}`, "_blank", "noreferrer");
   window.open(`http://localhost:8800/api/PdfFiles/${pdf}`)
    //setPdfFile(`http://localhost:8800/api/PdfFiles/${pdf}`)
   // uploading/files/
  };
  //<Topbar />


  /*
 
 
*/
/*
 <form class="formStyle" onSubmit={submitImage}>
    <h4>Upload PDF </h4>
    <br />
    <div class="mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Title"
        required
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
    <div class="mb-3">
      <input
        type="file"
        class="form-control"
        accept="application/pdf"
        required
        onChange={(e) => setFile(e.target.files[0])}
      />
    </div>
    <button class="btn btn-primary" type="submit">
      Submit
    </button>
  </form>

  <div class="uploaded">
    <h4>Uploaded PDF:</h4>
    <table class="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Show </th>
          <th>Download</th>
          <th>Analyse</th>
        </tr>
      </thead>
      <tbody>
        {allImage == null
          ? ""
          : allImage.map((data, index) => {
              const row = Math.floor(index / 3);
              const column = index % 3;
              if (row >= 3) return null; // Limit to 4 rows

              return column === 0 ? (
                <tr>
                  <td>
                    <div class="inner-div">
                      <h6>{data.title}</h6>
                    </div>
                  </td>
                  <td>
                    <div class="inner-div">
                      <button
                        class="btn btn-primary"
                        onClick={() => showPdf(data.pdf)}
                      >
                        Show PDF
                      </button>
                    </div>
                  </td> 
                  
                  <td>
                    <div class="inner-div">
                      <button
                        class="btn btn-secondary"
                        onClick={() => handleDownload1(data.pdf)}
                        //onClick={() => downloadFile(data.pdf)}
                      >
                        Download PDF
                      </button>
                    </div>
                  </td> 

                  <td>
                    <div class="inner-div">
                      <button
                        class="btn btn-secondary"
                        onClick={() => handleDownload1(data.pdf)}
                        //onClick={() => downloadFile(data.pdf)}
                      >
                        Analyse PDF
                      </button>
                    </div>
                  </td> 
                </tr>
              ) : (
                <> <tr><td>
                    <div class="inner-div">
                      <h6>{data.title}</h6>
                    </div>
                  </td><td>
                      <div class="inner-div">
                        <button
                          class="btn btn-primary"
                          onClick={() => showPdf(data.pdf)}
                        >
                          Show PDF
                        </button>
                      </div>
                      
                    </td>
                    <td>
                      <div class="inner-div">
                        <button
                          class="btn btn-secondary"
                          onClick={() => handleDownload1(data.pdf)}                         
                          //onClick={() => downloadFile(data.pdf)}
                        >
                          Download PDF
                        </button>
                      </div>
                      
                    </td>
                    <td>
                      <div class="inner-div">
                        <button
                          class="btn btn-secondary"
                          onClick={() => handleDownload1(data.pdf)}                         
                          //onClick={() => downloadFile(data.pdf)}
                        >
                          Analyse PDF
                        </button>
                      </div>
                      
                    </td>
                    
                    </tr>
                    
                    </>
              );
            })}
      </tbody>
    </table>
  </div>

  <PdfComp pdfFile={pdfFile} />
</div> */


  return (
   <>
 
 <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0/css/bootstrap.min.css"></link>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0/js/bootstrap.min.js"></script>

<script src="https://unpkg.com/react/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"></script>
   <link rel="stylesheet" href="style.css" type="text/css"></link>
  <div class="container"> 
   <div className="container d-flex justify-content-center align-items-center vh-100">
  <form className="formStyle" onSubmit={submitImage}>
    <h4>Upload PDF in React</h4>
    <div className="form-group">
      <label htmlFor="title">Title</label>
      <input
        type="text"
        className="form-control"
        id="title"
        placeholder="Enter title"
        required
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
    <div className="form-group">
      <label htmlFor="pdf">PDF File</label>
      <input
        type="file"
        className="form-control-file"
        id="pdf"
        accept="application/pdf"
        required
        onChange={(e) => setFile(e.target.files[0])}
      />
    </div>
    <button className="btn btn-primary" type="submit">
      Submit
    </button>
  </form>
</div>
  

  <div className="uploaded">
    <h4>Uploaded PDF:</h4>
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Show</th>
          <th>Download</th>
          <th>Analyse</th>
        </tr>
      </thead>
      <tbody>
        {allImage == null
          ? ""
          : allImage.map((data, index) => {
              const row = Math.floor(index / 3);
              const column = index % 3;
              if (row >= 4) return null; // Limit to 4 rows

              return (
                <tr key={index}>
                  <td>
                    <div className="inner-div">
                      <h6>{data.title}</h6>
                    </div>
                  </td>
                  <td>
                    <div className="inner-div">
                      <button
                        className="btn btn-primary"
                        onClick={() => showPdf(data.pdf)}
                      >
                        Show PDF
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="inner-div">
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleDownload1(data.pdf)}
                      >
                        Download PDF
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="inner-div">
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleAnalysis(data.pdf)}
                      >
                        Analyse PDF
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
      </tbody>
    </table>
  </div>
  
<PdfComp pdfFile={pdfFile} />
</div>
  
 

  





  </>
  );
}

export default UploadingPdf;
/**/







/*

<form className="formStyle" onSubmit={submitImage}>
    <h4>Upload PDF in React</h4>
    <br />
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Title"
        required
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
    <div className="mb-3">
      <input
        type="file"
        className="form-control"
        accept="application/pdf"
        required
        onChange={(e) => setFile(e.target.files[0])}
      />
    </div>
    <button className="btn btn-primary" type="submit">
      Submit
    </button>
  </form>*/

/*<div className="App">
      <form className="formStyle" onSubmit={submitImage}>
        <h4>Upload Pdf in React</h4>
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          type="file"
          class="form-control"
          accept="application/pdf"
          required
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        <button class="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
      <div className="uploaded">
        <h4>Uploaded PDF:</h4>
        <div className="output-div">
          {allImage == null
            ? ""
            : allImage.map((data) => {
                return (
                  <div className="inner-div">
                    <h6>Title: {data.title}</h6>
                    <button
                      className="btn btn-primary"
                      onClick={() => showPdf(data.pdf)}
                    >
                      Show Pdf
                    </button>
                  </div>
                );
              })}
        </div>
      </div>
      <PdfComp pdfFile={pdfFile}/>
    </div>
    
    
    
    
    
       <div class="container">
  <form class="formStyle" onSubmit={submitImage}>
    <h4>Upload PDF in React</h4>
    <br />
    <div class="mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Title"
        required
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
    <div class="mb-3">
      <input
        type="file"
        class="form-control"
        accept="application/pdf"
        required
        onChange={(e) => setFile(e.target.files[0])}
      />
    </div>
    <button class="btn btn-primary" type="submit">
      Submit
    </button>
  </form>

  <div class="uploaded">
    <h4>Uploaded PDF:</h4>
    <div class="output-div">
      {allImage == null
        ? ""
        : allImage.map((data) => {
            return (
              <div class="inner-div">
                <h6>Title: {data.title}</h6>
                <button
                  class="btn btn-primary"
                  onClick={() => showPdf(data.pdf)}
                >
                  Show PDF
                </button>
              </div>
            );
          })}
    </div>
  </div>

  <PdfComp pdfFile={pdfFile}/>
</div> 




<div class="container">
  <form class="formStyle" onSubmit={submitImage}>
    <h4>Upload PDF in React</h4>
    <br />
    <div class="mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Title"
        required
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
    <div class="mb-3">
      <input
        type="file"
        class="form-control"
        accept="application/pdf"
        required
        onChange={(e) => setFile(e.target.files[0])}
      />
    </div>
    <button class="btn btn-primary" type="submit">
      Submit
    </button>
  </form>

  <div class="uploaded">
    <h4>Uploaded PDF:</h4>
    <div class="output-div">
      {allImage == null
        ? ""
        : allImage.map((data, index) => {
            return (
              <div class="inner-div" style={{ display: index >= 12 ? "none" : "block" }}>
                <h6>Title: {data.title}</h6>
                <button
                  class="btn btn-primary"
                  onClick={() => showPdf(data.pdf)}
                >
                  Show PDF
                </button>
              </div>
            );
          })}
    </div>
  </div>

  <PdfComp pdfFile={pdfFile} />
</div>













<div class="container">
  <form class="formStyle" onSubmit={submitImage}>
    <h4>Upload PDF in React</h4>
    <br />
    <div class="mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Title"
        required
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
    <div class="mb-3">
      <input
        type="file"
        class="form-control"
        accept="application/pdf"
        required
        onChange={(e) => setFile(e.target.files[0])}
      />
    </div>
    <button class="btn btn-primary" type="submit">
      Submit
    </button>
  </form>

  <div class="uploaded">
    <h4>Uploaded PDF:</h4>
    <table class="table">
      <tbody>
        {allImage == null
          ? ""
          : allImage.map((data, index) => {
              const row = Math.floor(index / 3);
              const column = index % 3;
              if (row >= 4) return null; // Limit to 4 rows

              return column === 0 ? (
                <tr>
                  <td>
                    <div class="inner-div">
                      <h6>Title: {data.title}</h6>
                      <button
                        class="btn btn-primary"
                        onClick={() => showPdf(data.pdf)}
                      >
                        Show PDF
                      </button>
                    </div>
                  </td>
              ) : (
                <td>
                  <div class="inner-div">
                    <h6>Title: {data.title}</h6>
                    <button
                      class="btn btn-primary"
                      onClick={() => showPdf(data.pdf)}
                    >
                      Show PDF
                    </button>
                  </div>
                </td>
              );
            })}
      </tbody>
    </table>
  </div>

  <PdfComp pdfFile={pdfFile} />
</div>
*/