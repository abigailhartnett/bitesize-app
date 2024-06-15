import React from "react";
import IconButton from "./buttons/IconButton";
import { useNavigate } from "react-router-dom";

const Menu = () => {
	const navigate = useNavigate();

	return (
		<div className="bg-white px-4 h-20 max-w-sm">
			<div className="flex items-center justify-between gap-1">
				<IconButton
					title="Go to pantry"
					icon="fas fa-apple-alt"
					onClick={() => navigate("/pantry")}
				/>
				<IconButton
					title="Go to shopping list"
					icon="fas fa-list-alt"
					onClick={() => navigate("/shopping-list")}
				/>
				<IconButton
					title="Go to recipes"
					icon="fas fa-book"
					onClick={() => navigate("/recipes")}
				/>
				<IconButton
					title="Go to meal plan"
					icon="fas fa-calendar"
					onClick={() => navigate("/meal-plan")}
				/>
			</div>
		</div>
	);
};

export default Menu;
