import { React, useState, useEffect } from "react";
import NewsItem from "../NewsItem/NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from './News.module.css'; 

function News({ keyword }) {
	let [articles, setArticles] = useState([]);
	let [totalResults, setTotalResults] = useState(0);
	let [page, setPage] = useState(1);

	const apiKey = import.meta.env.API_KEY;

	const fetchNews = async (pageNo) => {
		try {
		  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(keyword)}&page=${pageNo}&apiKey=${apiKey}`;
		  const response = await fetch(url);
		  const parsedData = await response.json();
		  console.log(parsedData)
	  
		  if (!parsedData.articles) {
			setArticles([]);
			setTotalResults(0);
			return;
		  }
	  
		  if (pageNo === 1) {
			setArticles(parsedData.articles);
		  } else {
			setArticles((prev) => prev.concat(parsedData.articles));
		  }
		  setTotalResults(parsedData.totalResults || 0);
		} catch (error) {
		  console.error("Fetch error:", error);
		  setArticles([]);
		  setTotalResults(0);
		}
	  };
	  

	useEffect(() => {
		setPage(1);
		fetchNews(1);
	}, [keyword]);

	const fetchMoreData = () => {
		const nextPage = page + 1;
		setPage(nextPage);
		fetchNews(nextPage);
	};

	return (

		<InfiniteScroll
			dataLength={articles.length}
			next={fetchMoreData}
			hasMore={articles.length < totalResults}
			loader={<h4 className="text-center">Loading...</h4>}
			endMessage={
				<p style={{ textAlign: "center" }}>
					<b>You have seen it all</b>
				</p>
			}
		>
			<div className={styles.newsContainer}>
				<div className="container my-3">
					<div className="row">
						{articles.map((element, index) => (
							<div className="col-md-4" key={index}>
								<NewsItem
									title={element.title}
									desc={element.description}
									imageURL={element.urlToImage || "https://via.placeholder.com/300x200.png?text=News+Image"}
									newsUrl={element.url}
									sourceName={element.source.name}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</InfiniteScroll>
	);
}

export default News;
