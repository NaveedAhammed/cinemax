import "./trailerItem.css";

import { BsPlayCircle } from "react-icons/bs";

function TrailerItem({ videoKey, name }) {
	return (
		<div className="trailerItem">
			<div className="thumbnail">
				<img
					src={`https://img.youtube.com/vi/${videoKey}/mqdefault.jpg`}
					alt={name}
					className="thumbnail-img"
				/>
				<BsPlayCircle className="trailer-play-icon" />
			</div>
			<span className="trailer-title">{name}</span>
		</div>
	);
}

export default TrailerItem;
