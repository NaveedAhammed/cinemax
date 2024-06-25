import "./footer.css";

import {
	BiLogoFacebook,
	BiLogoInstagram,
	BiLogoLinkedinSquare,
	BiLogoTwitter,
} from "react-icons/bi";

function Footer() {
	return (
		<footer className="footer">
			<ul className="links">
				<li>
					<span>Terms Of Use</span>
				</li>
				<li>
					<span>Privacy-Policy</span>
				</li>
				<li>
					<span>About</span>
				</li>
				<li>
					<span>Blog</span>
				</li>
				<li>
					<span>FAQ</span>
				</li>
			</ul>
			<p className="author">
				&copy; 2023 Shaik Naveed Ahammed, All rights are reserved
			</p>
			<ul className="social-links">
				<li>
					<BiLogoFacebook className="social-icon" />
				</li>
				<li>
					<BiLogoInstagram className="social-icon" />
				</li>
				<li>
					<BiLogoTwitter className="social-icon" />
				</li>
				<li>
					<BiLogoLinkedinSquare className="social-icon" />
				</li>
			</ul>
		</footer>
	);
}

export default Footer;
