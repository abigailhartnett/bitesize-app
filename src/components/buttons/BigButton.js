import React from "react";
import { Link } from "react-router-dom";

const BigButton = ({ text, link }) => {
	return (
		<div className="m-4">
			<Link to={link}>
				<div className="bg-gray-500 text-white p-4 rounded-lg text-center">
					{text}
				</div>
			</Link>
		</div>
	);
};

export default BigButton;
