import "./castItem.css";

import Male from "../../assets/male.svg";
import Female from "../../assets/female.svg";

function CastItem({ profile, name, character, gender }) {
	console.log(gender);
	const profileImg = profile
		? `https://www.themoviedb.org/t/p/w600_and_h600_bestv2${profile}`
		: gender === 1
		? Female
		: Male;

	return (
		<div className="castItem">
			<img src={profileImg} alt="" className="cast-profile-img" />
			<span className="realName">{name}</span>
			<span className="characterName">{character}</span>
		</div>
	);
}

export default CastItem;
