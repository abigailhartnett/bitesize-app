import React from "react";
import IconButton from "./buttons/IconButton";
import { useNavigate, useLocation } from "react-router-dom";

const Menu = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const currentPage = location.pathname;

	return (
		<div className="flex items-center justify-between gap-1 mt-1.5">
			<IconButton
				title="Go to meal plan"
				icon="fas fa-calendar"
				onClick={() => navigate("/meal-plan")}
				className={`${currentPage === "/meal-plan" ? "text-mustard" : ""}`}
			/>
			<IconButton
				title="Go to recipes"
				icon="fas fa-book"
				onClick={() => navigate("/recipes")}
				className={`${currentPage === "/recipes" ? "text-carrot" : ""}`}
			/>
			<IconButton
				title="Go to shopping list"
				icon="fas fa-list-alt"
				onClick={() => navigate("/shopping-list")}
				className={`${currentPage === "/shopping-list" ? "text-grape" : ""}`}
			/>
			<IconButton
				title="Go to pantry"
				icon="fas fa-apple-alt"
				onClick={() => navigate("/pantry")}
				className={`${currentPage === "/pantry" ? "text-tomato" : ""}`}
			/>
		</div>
	);
};

export default Menu;
