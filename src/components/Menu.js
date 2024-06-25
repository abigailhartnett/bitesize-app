import React from "react";
import IconButton from "./buttons/IconButton";
import { useNavigate, useLocation } from "react-router-dom";

const Menu = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const currentPage = location.pathname;

	return (
		<div className="bg-white mx-auto p-4 w-full border-t border-l-0 border-r-0 border-b-0 border-solid border-pepper/20">
			<div className="flex items-center justify-between gap-1">
				<IconButton
					title="Go to pantry"
					icon={`${currentPage === "/pantry" ? "fa-solid" : "fa-regular"} fa-crate-apple`}
					onClick={() => navigate("/pantry")}
					className={`${currentPage === "/pantry" ? "text-pomegranate" : "text-pepper/80"}`}
					size="xl"
				/>
				<IconButton
					title="Go to shopping list"
					icon={`${currentPage === "/shopping-list" ? "fa-solid" : "fa-regular"} fa-square-list`}
					onClick={() => navigate("/shopping-list")}
					className={`${currentPage === "/shopping-list" ? "text-pomegranate" : "text-pepper/80"}`}
					size="xl"
				/>
				<IconButton
					title="Go to recipes"
					icon={`${currentPage.includes("/recipes") ? "fa-solid" : "fa-regular"} fa-hat-chef`}
					onClick={() => navigate("/recipes")}
					className={`${currentPage.includes("/recipes") ? "text-pomegranate" : "text-pepper/80"}`}
					size="xl"
				/>
				<IconButton
					title="Go to meal plan"
					icon={`${currentPage === "/meal-plan" ? "fa-solid" : "fa-regular"} fa-calendar-lines`}
					onClick={() => null}
					className={`${currentPage === "/meal-plan" ? "text-pomegranate" : "text-pepper/80"}`}
					size="xl"
				/>
			</div>
		</div>
	);
};

export default Menu;
