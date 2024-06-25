import "./home.css";

import { useSelector } from "react-redux";
import HeroBanner from "../../components/heroBanner/HeroBanner";
import Popular from "./Popular";
import TopRated from "./TopRated";
import Trending from "./Trending";
import { useEffect, useState } from "react";
import axios from "axios";

const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
	Authorization: "bearer " + TMDB_TOKEN,
};

function Home() {
	const { genre, url } = useSelector((state) => state.home);
	const [heroBanner, setHeroBanner] = useState(null);
	const [mediaType, setMediaType] = useState("");

	useEffect(function () {
		let isMounted = true;
		const controller = new AbortController();

		async function getHero() {
			const searchUrl = ["/tv/airing_today", "/movie/now_playing"][
				Math.floor(Math.random() * 2)
			];
			setMediaType(searchUrl.split("/")[1]);
			axios
				.get(searchUrl, {
					signal: controller.signal,
					headers,
				})
				.then((res) => {
					const data =
						res?.data.results?.[Math.floor(Math.random() * 20)];
					isMounted && setHeroBanner(data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
		getHero();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);

	return (
		<div className="home">
			<HeroBanner
				allGenres={genre?.allGenres}
				imgUrl={url?.backdrop}
				heroBanner={heroBanner}
				mediaType={mediaType}
				showMediaType={false}
			/>
			<Trending />
			<Popular />
			<TopRated />
		</div>
	);
}

export default Home;
