import { useState } from "react";

import "./explore.css";
import SwitchTabs from "../../components/switchTabs/SwitchTabs";
import Carousel from "../../components/carousel/Carousel";
import { useFetch } from "../../hooks/useFetch";

function Trending({ mediaType }) {
	const [endPoint, setEndPoint] = useState("day");

	const handleTabChange = (tab) => {
		setEndPoint(tab === "Today" ? "day" : "week");
	};

	const { data, loading, error } = useFetch(
		`/trending/${mediaType}/${endPoint}`
	);

	return (
		<div className="carousel-section" style={{ marginTop: "-10rem" }}>
			<div className="section-header">
				<span className="section-title">Trending</span>
				<SwitchTabs
					data={["Today", "This Week"]}
					onTabChange={handleTabChange}
				/>
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

export default Trending;
