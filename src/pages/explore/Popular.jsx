import "./explore.css";
import Carousel from "../../components/carousel/Carousel";
import { useFetch } from "../../hooks/useFetch";

function Popular({ mediaType }) {
	const { data, loading, error } = useFetch(`/${mediaType}/popular`);

	return (
		<div className="carousel-section">
			<div className="section-header">
				<span className="section-title">Popular</span>
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

export default Popular;
