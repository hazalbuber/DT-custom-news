import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NewsItem.module.css";

function NewsItem(props) {
	const { title, desc, content, imageURL, newsUrl, sourceName, sourceDesc, fullArticle } = props;
	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/news", {
			state: {
				title,
				desc,
				content,
				imageURL,
				newsUrl,
				sourceName,
				sourceDesc,
				fullArticle,
			},
		});
	};

	return (
		<div className={`news-item ${styles.card}`}>
			<img src={imageURL} className={styles.image} alt="news visual" />
			<div className={styles.body}>
				<h5 className={styles.title}>
					{title.length > 15 ? title.slice(0, 15) + "..." : title}
				</h5>
				<p className={`new-item-desc ${styles.text}`}>
					{desc && desc.length > 100 ? desc.slice(0, 100) + "..." : desc || ""}
				</p>
				<hr />
				<p className={styles.source}>
					<strong>{sourceName}</strong><br />
					{sourceDesc}
				</p>
				<button className={styles.button} onClick={handleClick}>Read More</button>
			</div>
		</div>
	);
}

export default NewsItem;

