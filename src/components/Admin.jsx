// client/src/components/Admin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const [challengeText, setChallengeText] = useState('');
  const [candidateName, setCandidateName] = useState('');
  const navigate = useNavigate();

  // Save challenge text locally
  const handleChallengeSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('challengeText', challengeText);
    alert('Challenge text saved! The candidate can now start the test.');
    setChallengeText('');
  };

  // POST candidate name to the backend
  const handleNameSubmit = (e) => {
    e.preventDefault();
    fetch('https://blind2-2.onrender.com/api/name', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: candidateName })
    })
      .then((res) => res.json())
      .then((data) => {
        alert('Candidate name saved!');
        setCandidateName('');
      })
      .catch((err) => {
        console.error('Error saving candidate name:', err);
        alert('Error saving candidate name');
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {/* Challenge Text Form */}
      <form onSubmit={handleChallengeSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md mb-6">
        <h2 className="text-2xl mb-4 font-semibold">Set Challenge Text</h2>
        <textarea
          className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring"
          rows="5"
          value={challengeText}
          onChange={(e) => setChallengeText(e.target.value)}
          placeholder="Enter challenge text here..."
          required
        />
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Save Challenge
        </button>
      </form>

      {/* Candidate Name Form */}
      <form onSubmit={handleNameSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4 font-semibold">Save Candidate Name</h2>
        <input
          type="text"
          className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
          placeholder="Enter candidate name..."
          required
        />
        <button
          type="submit"
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
        >
          Save Name
        </button>
      </form>

      {/* Home Button */}
      <button
        onClick={() => navigate('/')}
        className="mt-6 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Home
      </button>
    </div>
  );
}

export default Admin;
