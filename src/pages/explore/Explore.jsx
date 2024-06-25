import "./explore.css";

import HeroBanner from "../../components/heroBanner/HeroBanner";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Trending from "./Trending";
import Popular from "./Popular";
import TopRated from "./TopRated";
import { useEffect, useState } from "react";
import axios from "axios";

const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
	Authorization: "bearer " + TMDB_TOKEN,
};

function Explore() {
	const { genre, url } = useSelector((state) => state.home);
	const { mediaType } = useParams();
	const [heroBanner, setHeroBanner] = useState(null);
	useEffect(
		function () {
			let isMounted = true;
			const controller = new AbortController();

			async function getHero() {
				const searchUrl =
					mediaType === "tv"
						? "/tv/airing_today"
						: "/movie/now_playing";
				axios
					.get(searchUrl, {
						signal: controller.signal,
						headers,
					})
					.then((res) => {
						console.log(res);
						const data =
							res?.data.results?.[Math.floor(Math.random() * 20)];
						isMounted && setHeroBanner(data);
					})
					.catch((err) => {
						console.log(err);
					});
			}
			getHero();
		},
		[mediaType]
	);
	return (
		<div className="explore">
			<HeroBanner
				allGenres={genre.allGenres}
				genres={genre[`${mediaType}`]}
				mediaType={mediaType}
				heroBanner={heroBanner}
				imgUrl={url?.backdrop}
			/>
			<Trending mediaType={mediaType} />
			<Popular mediaType={mediaType} />
			<TopRated mediaType={mediaType} />
		</div>
	);
}

export default Explore;
