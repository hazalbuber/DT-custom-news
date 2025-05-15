import { React, useState, useEffect } from "react";
import NewsItem from "../NewsItem/NewsItem";
import styles from './News.module.css';

function News({ keyword }) {
	let [articles, setArticles] = useState([]);
	let [totalResults, setTotalResults] = useState(0);
	let [page, setPage] = useState(1);
	let [loading, setLoading] = useState(false);

	const apiKey = process.env.REACT_APP_API_KEY;
	const pageSize = 20;

	const fetchNews = async (pageNo) => {
		setLoading(true);
		try {
			const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(keyword)}&page=${pageNo}&pageSize=${pageSize}&apiKey=${apiKey}`;
			const response = await fetch(url);
			const parsedData = await response.json();

			if (!parsedData.articles) {
				setArticles([]);
				setTotalResults(0);
			} else {
				if (pageNo === 1) {
					setArticles(parsedData.articles);
				} else {
					setArticles((prev) => prev.concat(parsedData.articles));
				}
				setTotalResults(parsedData.totalResults || 0);
			}
		} catch (error) {
			console.error("Fetch error:", error);
			setArticles([]);
			setTotalResults(0);
		}
		setLoading(false);
	};

	useEffect(() => {
		setPage(1);
		fetchNews(1);
	}, [keyword]);

	useEffect(() => {
		const handleScroll = () => {
			const bottomReached =
				window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

			if (bottomReached && !loading && articles.length < totalResults) {
				const nextPage = page + 1;
				setPage(nextPage);
				fetchNews(nextPage);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [page, loading, articles.length, totalResults]);

	return (
		<div className={styles.newsContainer}>
			<div className="container my-3">
				<div className="row g-5">
					{articles.map((element, index) => (
						<div className="col-md-4 d-flex align-items-stretch" key={index}>
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

				{loading && (
					<div className="text-center mt-4">
						<h4>Loading...</h4>
					</div>
				)}

				{articles.length >= totalResults && totalResults > 0 && (
					<p className="text-center mt-4"><b>You have seen it all</b></p>
				)}
			</div>
		</div>
	);
}

export default News;
