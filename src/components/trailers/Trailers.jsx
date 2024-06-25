import "./trailers.css";

import TrailerItem from "../trailerItem/TrailerItem";

function Trailers({ data }) {
	return (
		<div className="trailers">
			<h3 className="trailers-heading">Official Videos</h3>
			<div className="trailers-wrapper">
				{data?.map((item) => (
					<TrailerItem
						key={item.id}
						name={item?.name}
						videoKey={item.key}
					/>
				))}
			</div>
		</div>
	);
}

export default Trailers;
