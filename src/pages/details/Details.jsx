import "./details.css";

import { HiMiniPlay, HiMiniStar } from "react-icons/hi2";
import Cast from "../../components/cast/Cast.jsx";
import Trailers from "../../components/trailers/Trailers.jsx";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import toHoursAndMinutes from "../../util/runtimeCalculator.js";
import { useFetch } from "../../hooks/useFetch.jsx";
import Carousel from "../../components/carousel/Carousel.jsx";

function Details() {
	const { id, mediaType } = useParams();
	const { url } = useSelector((state) => state.home);
	const { data } = useFetch(`/${mediaType}/${id}`);
	const { data: credits } = useFetch(`/${mediaType}/${id}/credits`);
	const { data: recommendations, loading: recommendationsLoading } = useFetch(
		`/${mediaType}/${id}/recommendations`
	);
	console.log(data);
	const { data: similar, loading: similarLoading } = useFetch(
		`/${mediaType}/${id}/similar`
	);
	const { data: videos } = useFetch(`/${mediaType}/${id}/videos`);

	const director = credits?.crew?.filter((f) => f.job === "Director");
	const writer = credits?.crew?.filter(
		(f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
	);

	console.log(similar, recommendations);

	console.log(director, writer);

	return (
		<>
			{data && (
				<>
					<div className="details">
						<div className="shadow"></div>
						<div className="bottom"></div>
						<img
							src={`${url?.backdrop}${data?.backdrop_path}`}
							alt={data?.title || data?.original_name}
							className="bg-img"
						/>
						<div className="details-wrapper">
							<div className="details-left">
								<img
									src={`${url?.poster}${data?.poster_path}`}
									alt={data?.title || data?.original_name}
									className="poster-img"
								/>
							</div>
							<div className="details-right">
								<div className="details-title">
									<span>
										{data?.title || data?.name} (
										{data?.release_date?.split("-")[0] ||
											data?.first_air_date?.split("-")[0]}
										)
									</span>
								</div>
								<span className="oneliner">
									{data?.tagline}
								</span>
								<div className="details-genres">
									{data?.genres?.map((genre) => (
										<span key={genre.id}>
											{genre?.name}
										</span>
									))}
								</div>
								<div className="details-rating">
									<span className="imdb">IMDb</span>
									<span className="rate">
										{data?.vote_average?.toFixed(1)}
									</span>
									<HiMiniStar className="star" />
									<button className="play-btn">
										<HiMiniPlay className="play-icon" />
										<span>Watch Trailer</span>
									</button>
								</div>
								{data?.overview && (
									<div className="details-overview">
										<span>Overview:</span>
										<p>{data?.overview}</p>
									</div>
								)}
								<div className="details-info">
									<div className="infoItem">
										<span className="item-heading">
											Status:
										</span>
										<span>{data?.status}</span>
									</div>
									<div className="infoItem">
										<span className="item-heading">
											Released date:
										</span>
										<span>
											{dayjs(
												data?.release_date ||
													data?.first_air_date
											).format("MMM D, YYYY")}
										</span>
									</div>
									{data?.runtime && (
										<div className="infoItem">
											<span className="item-heading">
												Runtime:
											</span>
											<span>
												{toHoursAndMinutes(
													data?.runtime
												)}
											</span>
										</div>
									)}
									{data?.episode_run_time?.length > 0 && (
										<div className="infoItem">
											<span className="item-heading">
												Episode Runtime:
											</span>
											<span>
												{toHoursAndMinutes(
													data?.episode_run_time?.[0]
												)}
											</span>
										</div>
									)}
								</div>
								<hr className="hr" />
								{data?.number_of_seasons && (
									<>
										<div className="details-info">
											{data?.number_of_seasons && (
												<div className="infoItem">
													<span className="item-heading">
														Seasons:
													</span>
													<span>
														{
															data?.number_of_seasons
														}
													</span>
												</div>
											)}
											{data?.number_of_episodes && (
												<div className="infoItem">
													<span className="item-heading">
														Total Episodes:
													</span>
													<span>
														{
															data?.number_of_episodes
														}
													</span>
												</div>
											)}
											{data?.type && (
												<div className="infoItem">
													<span className="item-heading">
														Type:
													</span>
													<span>{data?.type}</span>
												</div>
											)}
										</div>
										<hr className="hr" />
									</>
								)}
								{director?.length > 0 && (
									<>
										<div className="details-info">
											<div className="infoItem">
												<span className="item-heading">
													Director:
												</span>
												{director?.map((d, i) => (
													<span key={i}>
														{d.name}
														{director?.length -
															1 !==
															i && ", "}
													</span>
												))}
											</div>
										</div>
										<hr className="hr" />
									</>
								)}
								{writer?.length > 0 && (
									<>
										<div className="details-info">
											<div className="infoItem">
												<span className="item-heading">
													Writer:
												</span>
												{writer?.map((d, i) => (
													<span key={i}>
														{d.name}
														{writer?.length - 1 !==
															i && ", "}
													</span>
												))}
											</div>
										</div>
										<hr className="hr" />
									</>
								)}
								{data?.created_by?.length > 0 && (
									<>
										<div className="details-info">
											<div className="infoItem">
												<span className="item-heading">
													Created By:
												</span>
												{data?.created_by?.map(
													(d, i) => (
														<span key={i}>
															{d.name}
															{data?.created_by
																?.length -
																1 !==
																i && ", "}
														</span>
													)
												)}
											</div>
										</div>
										<hr className="hr" />
									</>
								)}
							</div>
						</div>
					</div>
					{credits?.cast?.length > 0 && <Cast data={credits?.cast} />}
					{videos?.results?.length > 0 && (
						<Trailers data={videos?.results} />
					)}
					{recommendations?.results?.length > 0 && (
						<div className="header">
							<span className="subHeading">Recommendations</span>
							<Carousel
								loading={recommendationsLoading}
								data={recommendations?.results}
								mediaType={mediaType}
							/>
						</div>
					)}
					{similar?.results?.length > 0 && (
						<div className="header">
							<span className="subHeading">Similar</span>
							<Carousel
								data={similar?.results}
								mediaType={mediaType}
								loading={similarLoading}
							/>
						</div>
					)}
				</>
			)}
		</>
	);
}

export default Details;
