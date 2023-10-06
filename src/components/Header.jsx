import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<header className="body-font border-b border-purple-200 text-gray-600 bg-white">
			<div className="container flex items-center justify-center mx-auto p-5">
				<Link to="/">
					<span className="font-bold text-3xl text-purple-500">AI Workout Planner</span>
				</Link>
			</div>
		</header>
	);
};

export default Header;
