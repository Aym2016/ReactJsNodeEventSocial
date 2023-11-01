import React, { useState } from 'react';
import axios from 'axios';

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('pdf', selectedFile);

    axios
      .post('files/upload', formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
  };

  return (
    <div className="app">
      <div className="menu">
        {/* Menu items */}
      </div>
      <div className="content">
        <h1>Upload PDF File</h1>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
}
/*import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('pdf', selectedFile);

    axios
      .post('/upload', formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
  };

  return (
    <div className="app">
      <div className="menu">
        {/* Menu items */
      /*</div>
      <div className="content">
        <h1>Upload PDF File</h1>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
};

export default Upload;*/