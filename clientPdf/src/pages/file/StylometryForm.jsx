import  React,{ useState } from 'react';
import axios from 'axios';
import BarController from 'chart.js';

const StylometryForm = () => {
  const [file, setFile] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('http://localhost:8800/api/uploading/analyze', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        console.log('Stylometry analysis completed and saved.');
        setAnalysisData(response.data);
      } catch (error) {
        console.error('Error performing stylometry analysis:', error);
      }
    }
  };

  const renderAnalysisResults = () => {
    if (!analysisData) {
      return null;
    }

    // Extract analysis data
    const { filename, wordFrequencies, sentenceLengths, vocabularySize } = analysisData;

    // Create a bar chart for word frequencies
    const wordFrequenciesChart = new BarController('wordFrequenciesChart', {
      type: 'bar',
      data: {
        labels: Object.keys(wordFrequencies),
        datasets: [
          {
            label: 'Word Frequencies',
            data: Object.values(wordFrequencies),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Render the analysis results
    return (
      <div>
        <h2>Analysis Results for {filename}</h2>
        <h3>Word Frequencies Chart</h3>
        <canvas id="wordFrequenciesChart" width="400" height="200"></canvas>
        <p>Sentence Lengths: {sentenceLengths.join(', ')}</p>
        <p>Vocabulary Size: {vocabularySize}</p>
      </div>
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button type="submit">Analyze</button>
      </form>
      {renderAnalysisResults()}
    </div>
  );
};

export default StylometryForm;