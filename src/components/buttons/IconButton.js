import React from "react";
import { FontAwesomeIcon, fontAwesome } from "@fortawesome/react-fontawesome";

const IconButton = ({ icon }) => {
	return (
		<div className="cursor-pointer active:bg-gray-400 h-11 w-11 flex justify-center items-center">
			<FontAwesomeIcon icon={icon} />
		</div>
	);
};

export default IconButton;
