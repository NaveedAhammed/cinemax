import "./switchTabs.css";

import { useRef, useState } from "react";

function SwitchTabs({ data, onTabChange }) {
	const [selectedTab, setSelectedTab] = useState(0);
	const [left, setLeft] = useState(0);
	const tabRef = useRef();

	const handleActiveTab = (tab, index) => {
		const tabWidth = tabRef.current.clientWidth;
		setLeft(index * tabWidth);
		setTimeout(() => {
			setSelectedTab(index);
		}, 300);
		onTabChange(tab);
	};

	return (
		<div className="switchingTabs">
			<div className="tabItems">
				{data.map((tab, i) => (
					<span
						key={i}
						className={`tabItem ${
							selectedTab === i ? "active" : "inactive"
						}`}
						onClick={() => handleActiveTab(tab, i)}
						ref={tabRef}
					>
						{tab}
					</span>
				))}
				<span className="movingBg" style={{ left }} />
			</div>
		</div>
	);
}

export default SwitchTabs;
