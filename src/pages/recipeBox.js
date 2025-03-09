import React from "react";
import { useNavigate } from "react-router-dom";
import { usePantry } from "../contexts/PantryContext";
import {
	SearchBar,
	RecipeItem,
	ListView,
	IconButton,
	TopBar,
	Filter,
	Menu,
} from "bitesize-app/components";

import { useSearch, useFilter } from "bitesize-app/hooks";

import { RECIPE_FILTER_OPTIONS } from "bitesize-app/constants";

const RecipeBoxPage = () => {
	const { recipes } = usePantry();
	const navigate = useNavigate();
	const [filteredItems, setSearchQuery] = useSearch(recipes, "title");

	const [filter, setFilter] = useFilter(RECIPE_FILTER_OPTIONS);

	const filteredRecipes = recipes?.filter(
		(item) =>
			item && filter?.includes(item.status) && filteredItems?.includes(item)
	);

	return (
		<>
			<TopBar>
				<div className="flex items-center gap-2">
					<SearchBar
						id={"searchInput"}
						placeholder={"Search recipes..."}
						setSearchQuery={setSearchQuery}
					/>
					<IconButton
						icon="fa-plus"
						onClick={() => navigate("/create-recipe")}
						variant="secondary"
						faStyle="fa-solid"
						size="lg"
						className="bg-pomegranate text-white"
					/>
				</div>
				<Filter
					filter={filter}
					setFilter={setFilter}
					options={["planned", "not planned"]}
				/>
			</TopBar>

			<ListView grid>
				{filteredRecipes?.length > 0 ? (
					filteredRecipes.map((item) => (
						<RecipeItem item={item} slug={item.slug} recipes={recipes} grid />
					))
				) : (
					<div className="text-center pt-4">
						<span>Whoops! No items found 😱</span>
					</div>
				)}
			</ListView>

			<Menu />
		</>
	);
};

export default RecipeBoxPage;
