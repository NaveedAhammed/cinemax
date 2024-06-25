import "./navbar.css";

import { IoMdArrowDropdown, IoIosNotificationsOutline } from "react-icons/io";
import { IoMenu, IoSearchOutline } from "react-icons/io5";
import Profile from "../../assets/profile.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";

const activeLink = ({ isActive }) => {
	return `nav-link ${isActive ? "active" : "inactive"}`;
};

function Navbar({ background }) {
	const [isActive, setIsActive] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	const searchInput = useRef();
	const navigate = useNavigate();

	function handleSearchActive() {
		setIsActive(true);
		searchInput.current.focus();
	}

	function handleSearch(e) {
		if (!searchQuery) return;
		if (e.key === "Enter") {
			navigate(`/search?query=${searchQuery}`);
		}
	}

	function handleCloseSearch() {
		setSearchQuery("");
		setIsActive(false);
	}

	useEffect(() => {
		const handler = (e) => {
			if (!searchInput.current?.contains(e.target)) {
				setIsActive(false);
			}
		};

		document.addEventListener("mousedown", handler);

		return () => {
			document.removeEventListener("mousedown", handler);
		};
	}, []);

	return (
		<header className="navbar-header" style={{ background: background }}>
			<nav className="navbar">
				<div className="navbar-left">
					<Link to="/" className="logo">
						Cinemax
					</Link>
					<div className="nav-links">
						<NavLink to="/" className={activeLink}>
							Home
						</NavLink>
						<NavLink to="/explore/movie" className={activeLink}>
							Movies
						</NavLink>
						<NavLink to="/explore/tv" className={activeLink}>
							TV Shows
						</NavLink>
					</div>
				</div>
				<div className="navbar-right">
					<div
						className={`search ${isActive ? "active" : "inactive"}`}
					>
						<IoSearchOutline
							className="search-icon"
							onClick={handleSearchActive}
						/>
						<input
							type="text"
							className={`searchInp ${
								isActive ? "active" : "inactive"
							}`}
							placeholder="Titles, people..."
							ref={searchInput}
							value={searchQuery}
							onKeyUp={handleSearch}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						{searchQuery && (
							<RxCross2
								className="icon"
								onClick={handleCloseSearch}
							/>
						)}
					</div>
					<div className="user">
						<IoIosNotificationsOutline className="notification-icon" />
						<div className="profile">
							<img
								src={Profile}
								alt="Profile"
								className="profileImg"
							/>
							<IoMdArrowDropdown className="drop-down-icon" />
						</div>
					</div>
					<IoMenu className="menu" />
				</div>
			</nav>
		</header>
	);
}

export default Navbar;
