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
				id={item.id}
			/>
		);
	});

	return (
		<div>
			<div>{recipeItems}</div>
		</div>
	);
};

export default RecipeList;
