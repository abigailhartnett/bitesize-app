import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const IconButton = ({ icon, link }) => {
	return (
		<div className="cursor-pointer active:bg-gray-400 h-11 w-11 flex justify-center items-center">
			<Link to={link}>
				<FontAwesomeIcon icon={icon} />
			</Link>
		</div>
	);
};

export default IconButton;
