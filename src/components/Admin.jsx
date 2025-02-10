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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      {/* Challenge Text Form */}
      <form
        onSubmit={handleChallengeSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mb-8"
      >
        <h2 className="text-2xl mb-4 font-bold text-gray-800 text-center">
          Set Challenge Text
        </h2>
        <textarea
          className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows="5"
          value={challengeText}
          onChange={(e) => setChallengeText(e.target.value)}
          placeholder="Enter challenge text here..."
          required
        />
        <button
          type="submit"
          className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded transition duration-300 w-full font-semibold"
        >
          Save Challenge
        </button>
      </form>

      {/* Candidate Name Form */}
      <form
        onSubmit={handleNameSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl mb-4 font-bold text-gray-800 text-center">
          Save Candidate Name
        </h2>
        <input
          type="text"
          className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
          placeholder="Enter candidate name..."
          required
        />
        <button
          type="submit"
          className="mt-6 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded transition duration-300 w-full font-semibold"
        >
          Save Name
        </button>
      </form>

      {/* Home Button */}
      <button
        onClick={() => navigate('/')}
        className="mt-8 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded transition duration-300 font-semibold"
      >
        Home
      </button>
    </div>
  );
}

export default Admin;

