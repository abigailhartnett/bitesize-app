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
			className="cursor-pointer active:bg-pepper h-11 w-11 flex justify-center items-center active:text-salt"
		>
			<FontAwesomeIcon icon={icon} />
		</button>
	);
};

export default IconButton;
