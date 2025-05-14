// src/components/SearchResult.js
import React from 'react';

const SearchResult = ({ article }) => {
  return (
    <div
      className="search-result p-2 border-bottom"
      onClick={() => window.open(article.url, "_blank")}
      style={{ cursor: "pointer" }}
    >
      <strong>{article.title}</strong>
      <div className="text-muted small">{article.source.name}</div>
    </div>
  );
};

export default SearchResult;
