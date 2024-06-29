import "./heroBanner.css";

import { HiMiniStar, HiMiniPlay } from "react-icons/hi2";
import { IoIosInformationCircleOutline } from "react-icons/io";
import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";

function HeroBanner({
	genres,
	allGenres,
	mediaType,
	heroBanner,
	imgUrl,
	showMediaType,
}) {
	return (
		<div className="heroBanner">
			{showMediaType && (
				<div className="category">
					<span className="type">
						{mediaType === "tv" ? "Tv Shows" : "Movies"}
					</span>
					<select className="select">
						{genres?.map((genre) => (
							<option value={genre?.name} key={genre?.id}>
								{genre?.name}
							</option>
						))}
					</select>
				</div>
			)}
			<div className="shadow"></div>
			<div className="bottom"></div>
			<img
				src={`${imgUrl}${heroBanner?.backdrop_path}`}
				alt={heroBanner?.title || heroBanner?.name}
				className="banner-img"
			/>
			<div className="hero-details">
				<h1 className="hero-title">
					{heroBanner?.title || heroBanner?.name}
				</h1>
				<div className="hero-info">
					<span className="hero-releaseDate">
						{dayjs(heroBanner?.release_date).format("MMM D, YYYY")}
					</span>
					<span>&#9679;</span>
					<div className="hero-genres">
						{heroBanner?.genre_ids?.map((id, i) => (
							<React.Fragment key={id}>
								<span>{allGenres[`${id}`]?.name}</span>
								{i !== heroBanner?.genre_ids?.length - 1 && (
									<span>,</span>
								)}
							</React.Fragment>
						))}
					</div>
					<span>&#9679;</span>
					<div className="hero-rating">
						<span className="imdb">IMDb</span>
						<div className="rate">
							<span>{heroBanner?.vote_average?.toFixed(1)}</span>
							<HiMiniStar className="star-icon" />
						</div>
					</div>
				</div>
				{heroBanner?.overview && (
					<div className="hero-overview">
						<span>Overview:</span>
						<p>{heroBanner.overview}</p>
					</div>
				)}
				<div className="actions">
					<button className={`btn primary`}>
						<HiMiniPlay className="play-icon" />
						<span>Play Trailer</span>
					</button>
					<Link
						to={`/${mediaType}/${heroBanner?.id}`}
						className={`btn secondary`}
					>
						<IoIosInformationCircleOutline className="info-icon" />
						<span>More Info</span>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default HeroBanner;
