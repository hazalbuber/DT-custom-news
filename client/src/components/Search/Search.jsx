import React, { useState } from 'react';
import SearchResultsList from './SearchResultsList';

const Search = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);

  const apiKey = process.env.REACT_APP_API_KEY;

  const fetchData = (value) => {
    const url = `https://newsapi.org/v2/everything?q=${value}&from=2025-05-11&sortBy=popularity&apiKey=${apiKey}`;

  
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const filtered = (data.articles || []).filter((article) =>
          (article.title && article.title.toLowerCase().includes(value.toLowerCase())) ||
          (article.description && article.description.toLowerCase().includes(value.toLowerCase())) ||
          (article.content && article.content.toLowerCase().includes(value.toLowerCase()))
        );
        setResults(filtered);
      })
      .catch((err) => console.error("Fetch error:", err));
  };
  

  const handleChange = (value) => {
    setInput(value);
    if (value.trim() !== '') {
      fetchData(value);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="position-relative" style={{ width: "300px" }}>
      <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
        <button className="btn p-0 border-0 bg-transparent me-2" type="submit">
          <i className="bi bi-search fs-5"></i>
        </button>
        <input
          className="form-control"
          type="search"
          placeholder="Search news..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          aria-label="Search"
        />
      </form>
      <SearchResultsList results={results} />
    </div>
  );
};

export default Search;
