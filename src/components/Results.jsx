// client/src/components/Results.jsx
import React, { useEffect, useState } from 'react';

function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch('https://blind2-2.onrender.com/api/results')
      .then((response) => response.json())
      .then((data) => {
        // Sort the results in ascending order by timeTaken (lowest first)
        const sortedResults = data.sort(
          (a, b) => parseFloat(a.timeTaken) - parseFloat(b.timeTaken)
        );
        setResults(sortedResults);
      })
      .catch((err) => {
        console.error('Error fetching results:', err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl mb-6 font-bold">Leaderboard</h1>
      <table className="min-w-full bg-white rounded shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">#</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Accuracy (%)</th>
            <th className="py-2 px-4 border-b">Time Taken (s)</th>
            <th className="py-2 px-4 border-b">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={result._id || index} className="text-center">
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{result.name || 'N/A'}</td>
              <td className="py-2 px-4 border-b">{result.accuracy}</td>
              <td className="py-2 px-4 border-b">{result.timeTaken}</td>
              <td className="py-2 px-4 border-b">
                {new Date(result.timestamp).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Results;
