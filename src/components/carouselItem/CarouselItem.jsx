import "./carouselItem.css";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Poster from "../../assets/poster.svg";

function CarouselItem({ poster, title, mediaType, id }) {
	const { poster: posterUrl } = useSelector((state) => state.home.url);
	const posterImg = poster ? `${posterUrl}${poster}` : Poster;

	return (
		<Link to={`/${mediaType}/${id}`} className="carouselItem">
			<img src={posterImg} alt={title} className="poster-img" />
		</Link>
	);
}

export default CarouselItem;
