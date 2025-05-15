import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import NewsItem from '../../components/NewsItem/NewsItem'; // yolu projenin yapısına göre ayarla
import styles from './ResultPage.module.css'; // yeni bir stil dosyası oluşturabilirsin

const ResultPage = () => {
  const [searchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const query = searchParams.get('q');
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return;
      setLoading(true);

      const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&pageSize=30&sortBy=popularity&apiKey=${apiKey}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setArticles(data.articles || []);
      } catch (err) {
        console.error('Fetch error:', err);
        setArticles([]);
      }
      setLoading(false);
    };

    fetchData();
  }, [query, apiKey]);

  return (
    <div className={styles.resultContainer}>
      <div className="container mt-4">
        <h3 className="mb-4">Search results for "{query}"</h3>

        {loading && <p>Loading...</p>}

        <div className="row g-5">
          {articles.map((article, index) => (
            <div className="col-md-4 d-flex align-items-stretch" key={index}>
              <NewsItem
                title={article.title}
                desc={article.description}
                imageURL={article.urlToImage || "https://via.placeholder.com/300x200.png?text=News+Image"}
                newsUrl={article.url}
                sourceName={article.source.name}
                sourceDesc={article.author || ''}
                fullArticle={article.content || ''}
              />
            </div>
          ))}
        </div>

        {(!loading && articles.length === 0) && (
          <p className="text-muted mt-4">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
