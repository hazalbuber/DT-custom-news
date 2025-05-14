import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function NewsPage() {
	const { state } = useLocation();
	const navigate = useNavigate();

	if (!state) {
		return (
			<div className="container my-4">
				<h2>No article data found.</h2>
				<button className="btn btn-secondary mt-3" onClick={() => navigate("/")}>
					Go Back
				</button>
			</div>
		);
	}

	const { title, desc, imageURL, newsUrl, sourceName, sourceDesc } = state;

	return (
		<div className="container my-5">
			<h1 className="mb-3">{title}</h1>
			<img
				src={imageURL}
				alt="news"
				className="img-fluid mb-3"
				style={{ maxHeight: "400px", objectFit: "cover" }}
			/>
			<p className="lead">{desc}</p>
			<hr />
			<p><strong>Source:</strong> {sourceName}</p>
			<p>{sourceDesc}</p>
			<a className="btn" href={newsUrl} target="_blank" rel="noopener noreferrer">
				Read Full Article
			</a>
		</div>
	);
}

export default NewsPage;
