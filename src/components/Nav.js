import React from "react";
import { Link } from "react-router-dom";
import IconButton from "./buttons/IconButton";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ sortType }) => {
	// const [isClicked, setIsClicked] = useState(false);

	// const handleClick = ({ sort }) => {
	// 	setIsClicked(!isClicked);
	// };

	return (
		<div className="flex py-4 justify-between">
			<Link to="/">
				<div className="flex items-center gap-4">
					<IconButton icon={faChevronLeft} to="/" />
					{window.location.pathname === "/meal-plan" ? (
						<h1>Meal Plan</h1>
					) : window.location.pathname === "/pantry" ? (
						<h1>Pantry</h1>
					) : window.location.pathname === "/recipe-box" ? (
						<h1>Recipe Box</h1>
					) : window.location.pathname === "/shopping-list" ? (
						<h1>Shopping List</h1>
					) : (
						""
					)}
				</div>
			</Link>
		</div>
	);
};

export default Nav;
