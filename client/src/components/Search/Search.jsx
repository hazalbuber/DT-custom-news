import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      navigate(`/results?q=${encodeURIComponent(input.trim())}`);
    }
  };

  return (
    <div className="position-relative" style={{ width: "300px" }}>
      <form className="d-flex" role="search" onSubmit={handleSearch}>
        <button className="btn p-0 border-0 bg-transparent me-2" type="submit">
          <i className="bi bi-search fs-5"></i>
        </button>
        <input
          className="form-control"
          type="search"
          placeholder="Search news..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="Search"
        />
      </form>
    </div>
  );
};

export default Search;
