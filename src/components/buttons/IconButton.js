import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconButton = ({ icon, onClick }) => {
	return (
		<button
			onClick={onClick}
			className="cursor-pointer active:bg-pepper h-11 w-11 flex justify-center items-center active:text-salt"
		>
			<FontAwesomeIcon icon={icon} />
		</button>
	);
};

export default IconButton;
