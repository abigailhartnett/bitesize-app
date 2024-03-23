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
				{window.location.pathname === "/meal-plan"
					? "Meal Plan"
					: window.location.pathname === "/pantry"
						? "Pantry"
						: window.location.pathname === "/recipe-box"
							? "Recipe Box"
							: window.location.pathname === "/shopping-list"
								? "Shopping List"
								: ""}
			</div>
		</div>
	);
};

export default Nav;
