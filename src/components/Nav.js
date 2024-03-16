import React from "react";
import Sort from "./Sort";
import IconButton from "./buttons/IconButton";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ sortType }) => {
	// const [isClicked, setIsClicked] = useState(false);

	// const handleClick = ({ sort }) => {
	// 	setIsClicked(!isClicked);
	// };

	return (
		<div className="flex p-4 justify-between">
			<div className="flex items-center gap-4">
				<IconButton icon={faChevronLeft} />
				{window.location.pathname === "/pantry" ? "Pantry" : ""}
			</div>
			<Sort sortType="Pantry" />
		</div>
	);
};

export default Nav;
