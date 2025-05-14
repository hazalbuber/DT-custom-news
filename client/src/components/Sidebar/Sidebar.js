import React from 'react'
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const categories = [
    "Home Page",
    "Breaking News",
    "Science & Tech",
    "Finance",
    "Lifestyle",
    "Sport",
    "General"
  ];

  const generateItems = (items) =>
    items.map((item, index) => {
      const isHome = item === "Home Page";
      const path = isHome
        ? '/'
        : `/category/${item.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`;
        
      return (
        <div key={index}>
          <Link to={path}>
            <p>{item}</p>
          </Link>
        </div>
      );
    });

  return (
    <div className="sidebar">
      {generateItems(categories)}
    </div>
  );
};

export default Sidebar;
