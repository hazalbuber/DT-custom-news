import React from 'react';
import { useParams } from 'react-router-dom';
import News from '../../components/News/News'; 
import Sidebar from '../../components/Sidebar/Sidebar';

const CategoryPage = () => {
  const { categoryName } = useParams();

  const keyword = categoryName.replace(/-/g, ' ');

  return (
    <div>
      <Sidebar/>
      <h2 style={{ textAlign: 'center', marginTop: '1rem' }}>
      <strong>{keyword.toUpperCase()}</strong>
      </h2>
      <News keyword={keyword} key={keyword} />
    </div>
  );
};

export default CategoryPage;
