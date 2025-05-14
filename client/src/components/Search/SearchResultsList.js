// src/components/SearchResultsList.js
import React from 'react';
import SearchResult from './SearchResult';

const SearchResultsList = ({ results }) => {
  if (results.length === 0) return null;

  return (
    <div
      className="results-list position-absolute bg-white rounded shadow p-2 mt-2"
      style={{ zIndex: 1000, width: "100%", maxHeight: "400px", overflowY: "auto" }}
    >
      {results.map((article, index) => (
        <SearchResult article={article} key={index} />
      ))}
    </div>
  );
};

export default SearchResultsList;
