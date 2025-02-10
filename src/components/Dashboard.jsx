import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { candidateText, challengeText, startTime, endTime } = location.state || {};
  
  const [accuracy, setAccuracy] = useState(null);
  const [timeTaken, setTimeTaken] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  if (!candidateText || !challengeText || !startTime || !endTime) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
        <p className="text-red-500 text-xl">
          Missing test data. Please take the test first.
        </p>
      </div>
    );
  }

  // Function to compute results and send POST request
  const handleSubmitResults = () => {
    // Guard against multiple submissions
    if (submitted) return;
    setSubmitted(true);

    const sanitize = (text) =>
      text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .trim();
    
    const candidateWords = sanitize(candidateText).split(/\s+/);
    const challengeWords = sanitize(challengeText).split(/\s+/);
    
    let correct = 0;
    for (let i = 0; i < challengeWords.length; i++) {
      if (candidateWords[i] && candidateWords[i] === challengeWords[i]) {
        correct++;
      }
    }
    
    const computedAccuracy = (correct / challengeWords.length) * 100;
    setAccuracy(computedAccuracy.toFixed(2));
    
    const computedTime = ((endTime - startTime) / 1000).toFixed(2); // in seconds
    setTimeTaken(computedTime);

    const resultData = {
      accuracy: computedAccuracy,
      timeTaken: computedTime,
      timestamp: new Date(),
    };

    fetch('https://blind2-2.onrender.com/api/results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resultData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Result stored:', data);
      })
      .catch(err => {
        console.error('Error storing result:', err);
      });
  };

  const handleViewResults = () => {
    navigate('/results');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl md:text-4xl mb-6 font-extrabold text-white text-center">
          Test Results
        </h1>
        {(accuracy !== null && timeTaken !== null) ? (
          <>
            <p className="mb-3 text-xl text-gray-300">
              Accuracy: <span className="font-bold text-white">{accuracy}%</span>
            </p>
            <p className="mb-4 text-xl text-gray-300">
              Time Taken: <span className="font-bold text-white">{timeTaken} seconds</span>
            </p>
            {/* Admin Button added after displaying the test results */}
            <button
              onClick={() => navigate('/admin')}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-lg w-full"
            >
              Admin
            </button>
          </>
        ) : (
          <button
            onClick={handleSubmitResults}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded w-full text-xl"
            disabled={submitted}  // disable after submission
          >
            Submit Results
          </button>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

