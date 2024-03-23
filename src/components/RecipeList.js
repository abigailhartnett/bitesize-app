import React from "react";
import { recipes } from "../data/recipes";
import RecipeItem from "./RecipeItem";

const RecipeList = () => {
	const recipeItems = recipes.map((item) => {
		return (
			<RecipeItem
				name={item.name}
				readiness={item.readiness}
				link={item.link}
			/>
		);
	});

	return (
		<div>
			<div className="border-solid border-black border-2 border-b-0 border-x-0 pt-4">
				{recipeItems}
			</div>
		</div>
	);
};

export default RecipeList;
