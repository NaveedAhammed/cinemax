import "./explore.css";
import Carousel from "../../components/carousel/Carousel";
import { useFetch } from "../../hooks/useFetch";

function TopRated({ mediaType }) {
	const { data, loading, error } = useFetch(`/${mediaType}/top_rated`);

	return (
		<div className="carousel-section">
			<div className="section-header">
				<span className="section-title">Top Rated</span>
			</div>
			{error && <p>{error}</p>}
			<Carousel
				loading={loading}
				data={data?.results}
				mediaType={mediaType}
			/>
		</div>
	);
}

export default TopRated;
