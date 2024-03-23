import React from "react";
import { Link } from "react-router-dom";
import IconButton from "./buttons/IconButton";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ sortType, pageTitle }) => {
	// const [isClicked, setIsClicked] = useState(false);

	// const handleClick = ({ sort }) => {
	// 	setIsClicked(!isClicked);
	// };

	return (
		<div className="flex py-4 justify-between">
			<Link to="/">
				<div className="flex items-center gap-4">
					<IconButton icon={faChevronLeft} to="/" />
					<h1>{pageTitle}</h1>
				</div>
			</Link>
		</div>
	);
};

export default Nav;
