import "./home.css";

import { useState } from "react";

import SwitchTabs from "../../components/switchTabs/SwitchTabs";
import Carousel from "../../components/carousel/Carousel";
import { useFetch } from "../../hooks/useFetch";

function Popular() {
	const [endPoint, setEndPoint] = useState("movie");

	const handleTabChange = (tab) => {
		setEndPoint(tab === "Movies" ? "movie" : "tv");
	};

	const { data, loading, error } = useFetch(`/${endPoint}/popular`);

	return (
		<div className="carousel-section">
			<div className="section-header">
				<span className="section-title">Popular</span>
				<SwitchTabs
					data={["Movies", "TV Shows"]}
					onTabChange={handleTabChange}
				/>
			</div>
			{error && <p>{error}</p>}
			<Carousel
				loading={loading}
				data={data?.results}
				mediaType={endPoint}
			/>
		</div>
	);
}

export default Popular;
