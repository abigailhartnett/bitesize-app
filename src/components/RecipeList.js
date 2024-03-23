import React, { useState } from "react";
import { recipes } from "../data/recipes";
import Sort from "./Sort";
import Filter from "./Filter";
import RecipeItem from "./RecipeItem";

const RecipeList = () => {
	const [sortedItems, setSortedItems] = useState([]);
	const sortItems = (sortType) => {
		const sorted = [...sortedItems].sort((a, b) => {
			if (a[sortType] < b[sortType]) {
				return -1;
			} else if (a[sortType] > b[sortType]) {
				return 1;
			}
		});
		setSortedItems(sorted);
	};

	const recipeItems = recipes.map((item) => {
		return (
			<RecipeItem name={item.name} aisle={item.aisle} status={item.status} />
		);
	});

	return (
		<div>
			<Sort sortType="Recipes" onSort={sortItems} />
			<div className="border-solid border-black border-2 border-b-0 border-x-0 pt-4">
				{recipeItems}
			</div>
		</div>
	);
};

export default RecipeList;
