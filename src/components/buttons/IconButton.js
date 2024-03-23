import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const IconButton = ({ icon }) => {
	return (
		<div className="cursor-pointer active:bg-gray-400 h-11 w-11 flex justify-center items-center">
			<Link to="/">
				<FontAwesomeIcon icon={icon} />
			</Link>
		</div>
	);
};

export default IconButton;
