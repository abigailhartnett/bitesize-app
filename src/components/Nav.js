import React from "react";
import IconButton from "./buttons/IconButton";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Nav = ({ pageTitle, link }) => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(link);
	};

	return (
		<div className="flex justify-between">
			<div className="flex items-center gap-4 font-medium">
				<IconButton icon={faChevronLeft} onClick={handleClick} />
				<h1>{pageTitle}</h1>
			</div>
		</div>
	);
};

export default Nav;
