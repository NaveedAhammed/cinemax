import "./cast.css";

import CastItem from "../castItem/CastItem";

function Cast({ data }) {
	return (
		<div className="cast">
			<h3 className="cast-heading">Top Cast</h3>
			<div className="cast-wrapper">
				{data?.map((item) => (
					<CastItem
						key={item.id}
						profile={item?.profile_path}
						name={item?.name}
						character={item?.character}
						gender={item?.gender}
					/>
				))}
			</div>
		</div>
	);
}

export default Cast;
