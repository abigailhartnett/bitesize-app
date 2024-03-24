import React from "react";
import { recipes } from "../data/recipes";
import RecipeItem from "./RecipeItem";

const MealPlanList = () => {
	const recipeItems = recipes.map((item) => {
		return (
			item.planned && (
				<RecipeItem
					name={item.name}
					readiness={item.readiness}
					link={item.link}
				/>
			)
		);
	});

	return (
		<div>
			<div>{recipeItems}</div>
		</div>
	);
};

export default MealPlanList;
