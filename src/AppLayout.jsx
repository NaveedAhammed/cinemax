import "./appLayout.css";

import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { useEffect, useRef, useState } from "react";
import { fetchDataFromApi } from "./service/api";
import { useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import Loader from "./components/loader/Loader";

function AppLayout() {
	const container = useRef();
	const [scrollAmount, setScrollAmount] = useState(0);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);

	const background =
		scrollAmount <= 200
			? "linear-gradient(to top, transparent 0%, rgb(0, 0, 0, 0.3) 50%)"
			: "#000";

	useEffect(() => {
		const handleNavbar = () => {
			setScrollAmount(window.scrollY);
		};
		window.addEventListener("scroll", handleNavbar);
		return () => {
			window.removeEventListener("scroll", handleNavbar);
		};
	}, [scrollAmount]);

	useEffect(
		function () {
			function getInfo() {
				setIsLoading(true);
				Promise.all([
					fetchDataFromApi(`/genre/tv/list`),
					fetchDataFromApi(`/genre/movie/list`),
					fetchDataFromApi(`/configuration`),
				])
					.then((data) => {
						const allGenres = {};
						data[1].genres.map(
							(item) => (allGenres[item.id] = item)
						);
						data[0].genres.map(
							(item) => (allGenres[item.id] = item)
						);
						const genres = {
							movie: data[1].genres,
							tv: data[0].genres,
							allGenres,
						};
						const url = {
							backdrop:
								data[2].images.secure_base_url + "original",
							poster: data[2].images.secure_base_url + "original",
							profile:
								data[2].images.secure_base_url + "original",
						};
						dispatch(getGenres(genres));
						dispatch(getApiConfiguration(url));
					})
					.catch((err) => console.log(err))
					.finally(() => {
						setIsLoading(false);
					});
			}
			getInfo();
		},
		[dispatch]
	);

	return (
		<div className="app-layout">
			<Navbar background={background} />
			<main
				ref={container}
				className="main"
				style={{ display: `${isLoading ? "flex" : "unset"}` }}
			>
				{isLoading ? (
					<Loader color="white" height="5rem" width="5rem" />
				) : (
					<Outlet />
				)}
			</main>
			<Footer />
		</div>
	);
}

export default AppLayout;
