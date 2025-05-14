import React from "react";
import { useNavigate } from "react-router-dom";

function NewsItem(props) {
	const { title, desc, imageURL, newsUrl, sourceName, sourceDesc, fullArticle } = props;
	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/news", {
			state: {
				title,
				desc,
				imageURL,
				newsUrl,
				sourceName,
				sourceDesc,
				fullArticle,
			},
		});
	};

	return (
		<div className="card my-3" style={{ width: "18rem" }}>
			<img src={imageURL} className="card-img-top" alt="news visual" />
			<div className="card-body">
				<h5 className="card-title">{title}</h5>
				<p className="card-text">{desc}</p>
				<hr />
				<p className="card-text">
					<small className="text-muted">
						<strong>{sourceName}</strong><br />
						{sourceDesc}
					</small>
				</p>
				<button className="btn" onClick={handleClick}>Read More</button>
			</div>
		</div>
	);
}

export default NewsItem;

//`login-page ${styles.pageContainer}`