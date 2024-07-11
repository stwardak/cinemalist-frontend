import React from 'react';
import { useLocation } from 'react-router-dom';

export function SearchResults() {
  const location = useLocation();
  const results = location.state?.results || [];

  return (
    <div className="p-4 bg-black text-grey-200">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      {results.length > 0 ? (
        <ul>
          {results.map((result) => (
            <li key={result.id} className="mb-4">
              <a href={`/movies/${result.id}`} className="hover:text-white">
                {result.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}
