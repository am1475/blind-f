// client/src/components/Typing.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Typing() {
  const navigate = useNavigate();
  const challengeText = localStorage.getItem('challengeText') || '';
  const [candidateText, setCandidateText] = useState('');
  const [testStarted, setTestStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const handleStart = () => {
    setTestStarted(true);
    setStartTime(Date.now());
  };

  const handleSubmit = () => {
    const endTime = Date.now();
    // Pass data via router state to Dashboard
    navigate('/dashboard', { state: { candidateText, challengeText, startTime, endTime } });
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden patchy-bg">
      {/* Combined styles for patchy background and typewriter effect */}
      <style>{`
        .patchy-bg {
          background: #0d1117;
          background-image: 
            linear-gradient(135deg, rgba(255, 255, 255, 0.03) 25%, transparent 25%),
            linear-gradient(225deg, rgba(255, 255, 255, 0.03) 25%, transparent 25%),
            linear-gradient(45deg, rgba(255, 255, 255, 0.03) 25%, transparent 25%),
            linear-gradient(315deg, rgba(255, 255, 255, 0.03) 25%, transparent 25%);
          background-size: 40px 40px;
          background-position: 0 0, 0 20px, 20px -20px, -20px 0px;
        }
        .typewriter {
          overflow: hidden;              /* Hide the overflowing text */
          border-right: 0.15em solid #ffffff; /* The typewriter cursor */
          white-space: nowrap;           /* Keep text on a single line */
          margin: 0 auto;                /* Center the element */
          /* Infinite looping animation: type out then delete */
          animation: typing 4s steps(30, end) infinite, blink-caret 0.75s step-end infinite;
        }
        @keyframes typing {
          0% { width: 0; }
          40% { width: 100%; }
          60% { width: 100%; }
          100% { width: 0; }
        }
        @keyframes blink-caret {
          from, to { border-color: transparent; }
          50% { border-color: white; }
        }
        /* Responsive adjustments for smaller screens */
        @media (max-width: 640px) {
          .typewriter {
            font-size: 1.5rem;
            letter-spacing: 0.1em;
            animation: typing 3s steps(20, end) infinite, blink-caret 0.75s step-end infinite;
          }
        }
        @media (min-width: 641px) and (max-width: 1024px) {
          .typewriter {
            font-size: 2.25rem;
            letter-spacing: 0.15em;
            animation: typing 3.5s steps(25, end) infinite, blink-caret 0.75s step-end infinite;
          }
        }
        @media (min-width: 1025px) {
          .typewriter {
            font-size: 3rem;
            letter-spacing: 0.15em;
            animation: typing 4s steps(30, end) infinite, blink-caret 0.75s step-end infinite;
          }
        }
      `}</style>

      {/* Admin Button placed at the top-right */}
      <button
        onClick={() => navigate('/admin')}
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-lg"
      >
        Admin
      </button>
      
      <h1 className="typewriter text-center text-white mb-8 font-bold">
        Blindfold Typing Challenge
      </h1>
      
      {testStarted ? (
        <div className="w-full max-w-2xl px-4 mt-5">
          <textarea
            className="w-full h-40 p-4 bg-gray-800 text-white caret-white border border-gray-600 rounded focus:outline-none text-lg"
            placeholder="Type here..."
            value={candidateText}
            onChange={(e) => setCandidateText(e.target.value)}
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            autoCapitalize="none"
          />
          <button
            onClick={handleSubmit}
            className="mt-5 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 w-full text-lg"
          >
            Submit Test
          </button>
        </div>
      ) : (
        <button
          onClick={handleStart}
          className="bg-blue-500 text-white px-8 py-3 rounded hover:bg-blue-600 text-lg mt-10"
        >
          Start Test
        </button>
      )}
    </div>
  );
}

export default Typing;
