import "./carousel.css";

import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useRef } from "react";
import CarouselItem from "../carouselItem/CarouselItem";

function Carousel({ data, mediaType }) {
	const sliderRef = useRef();

	const scroll = (dir) => {
		if (sliderRef.current) {
			const sliderWidth = sliderRef.current.clientWidth;
			if (dir === "next") {
				sliderRef.current.scrollTo({
					left: sliderRef.current.scrollLeft + sliderWidth,
				});
			}
			if (dir === "prev") {
				sliderRef.current.scrollTo({
					left: sliderRef.current.scrollLeft - sliderWidth,
				});
			}
		}
	};

	const skItem = () => {
		return (
			<div className="skItem">
				<div className={`skPoster skeleton`}></div>
			</div>
		);
	};

	return (
		<>
			{data ? (
				<div className="carousel">
					<div className="carousel-wrapper">
						<button
							className={`arrow-btn arrow-left`}
							onClick={() => scroll("prev")}
						>
							<SlArrowLeft className="arrow-icon" />
						</button>
						<div className="carousel-slider" ref={sliderRef}>
							{data.map((item) => (
								<CarouselItem
									key={item.id}
									poster={item.poster_path}
									title={item.title}
									mediaType={mediaType}
									id={item.id}
								/>
							))}
						</div>
						<button
							className={`arrow-btn arrow-right`}
							onClick={() => scroll("next")}
						>
							<SlArrowRight className="arrow-icon" />
						</button>
					</div>
				</div>
			) : (
				<div className="skContainer">
					<div className="skWrapper">
						<div className="skSlider">
							{skItem()}
							{skItem()}
							{skItem()}
							{skItem()}
							{skItem()}
							{skItem()}
							{skItem()}
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default Carousel;
