import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { IconButton } from "bitesize-app/components";

const Menu = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const currentPage = location.pathname;

	return (
		<div className="bg-white mx-auto p-4 w-full border-t border-l-0 border-r-0 border-b-0 border-solid border-pepper/20">
			<div className="flex items-center justify-between gap-1">
				<div className="flex flex-col items-center">
					<IconButton
						title="Go to pantry"
						icon={`${currentPage === "/pantry" ? "fa-solid" : "fa-regular"} fa-crate-apple`}
						onClick={() => navigate("/pantry")}
						className={`${currentPage === "/pantry" ? "text-pomegranate" : "text-pepper/80"}`}
						size="xl"
					/>
					<span
						className={`text-xs font-medium ${currentPage === "/pantry" ? "text-pomegranate" : "text-pepper"}`}
					>
						Pantry
					</span>
				</div>

				<div className="flex flex-col items-center">
					<IconButton
						title="Go to shopping list"
						icon={`${currentPage === "/shopping-list" ? "fa-solid" : "fa-regular"} fa-square-list`}
						onClick={() => navigate("/shopping-list")}
						className={`${currentPage === "/shopping-list" ? "text-pomegranate" : "text-pepper/80"}`}
						size="xl"
					/>
					<span
						className={`text-xs font-medium ${currentPage === "/shopping-list" ? "text-pomegranate" : "text-pepper"}`}
					>
						Shopping
					</span>
				</div>

				<div className="flex flex-col items-center">
					<IconButton
						title="Go to recipes"
						icon={`${currentPage.includes("recipe") ? "fa-solid" : "fa-regular"} fa-hat-chef`}
						onClick={() => navigate("/recipes")}
						className={`${currentPage.includes("recipe") ? "text-pomegranate" : "text-pepper/80"}`}
						size="xl"
					/>
					<span
						className={`text-xs font-medium ${currentPage === "/recipes" ? "text-pomegranate" : "text-pepper"}`}
					>
						Recipes
					</span>
				</div>

				<div className="flex flex-col items-center">
					<IconButton
						title="Go to meal plan"
						icon={`${currentPage === "/meal-plan" ? "fa-solid" : "fa-regular"} fa-calendar-lines`}
						onClick={() => null}
						className={`${currentPage === "/meal-plan" ? "text-pomegranate" : "text-pepper/80"}`}
						size="xl"
					/>
					<span
						className={`text-xs font-medium ${currentPage === "/meal-plan" ? "text-pomegranate" : "text-pepper"}`}
					>
						Meals
					</span>
				</div>
			</div>
		</div>
	);
};

export default Menu;
