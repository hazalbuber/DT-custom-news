import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./NewsPage.css"; 

function NewsPage() {
	const { state } = useLocation();
	const navigate = useNavigate();

	if (!state) {
		return (
			<div className="container my-4 text-center">
				<h2>No article data found.</h2>
				<button className="btn btn-secondary mt-3" onClick={() => navigate("/")}>
					Go Back
				</button>
			</div>
		);
	}

	const { title, content, imageURL, newsUrl, sourceName, sourceDesc } = state;

	return (
		<div className="container my-5">
			<div className="card shadow p-4 border-0">
				<h1 className="text-center mb-4">{title}</h1>

				<div className="text-center mb-4">
					<img
						src={imageURL}
						alt="news"
						className="img-fluid rounded"
						style={{ maxHeight: "400px", objectFit: "cover" }}
					/>
				</div>

				<p className="fs-5 text-justify">{content}</p>

				<hr />

				<div className="mt-3">
					<p className="mb-1"><strong>Source:</strong> {sourceName}</p>
					<p className="text-muted">{sourceDesc}</p>
				</div>

				<div className="text mt-4">
					<a
						className="btn"
						href={newsUrl}
						target="_blank"
						rel="noopener noreferrer"
					>
						Read Full Article
					</a>
				</div>
			</div>
		</div>
	);
}

export default NewsPage;
