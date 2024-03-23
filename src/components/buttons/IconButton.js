import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const IconButton = ({ icon, link }) => {
	const navigate = useNavigate();

	return (
		<button
			onClick={() => {
				link ? navigate(link) : navigate(-1);
			}}
			className="cursor-pointer active:bg-gray-400 h-11 w-11 flex justify-center items-center"
		>
			<FontAwesomeIcon icon={icon} />
		</button>
	);
};

export default IconButton;
