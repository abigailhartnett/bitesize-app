import React from "react";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "./buttons/IconButton";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ sortType, pageTitle }) => {
	// const [isClicked, setIsClicked] = useState(false);

	// const handleClick = ({ sort }) => {
	// 	setIsClicked(!isClicked);
	// };

	const history = useNavigate();

	return (
		<div className="flex py-4 justify-between">
			<div className="flex items-center gap-4">
				<IconButton icon={faChevronLeft} onClick={-1} />
				<h1>{pageTitle}</h1>
			</div>
		</div>
	);
};

export default Nav;
