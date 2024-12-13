import React from "react";
import { useNavigate } from "react-router-dom";

import {
	SearchBar,
	RecipeItem,
	ListView,
	IconButton,
	TopBar,
	Container,
	Filter,
	Menu,
} from "bitesize-app/components";

import { useSearch, useFilter } from "bitesize-app/hooks";

import { RECIPE_FILTER_OPTIONS } from "bitesize-app/constants";

const RecipeBoxPage = ({ recipes }) => {
	const navigate = useNavigate();
	const [filteredItems, setSearchQuery] = useSearch(recipes, "title");

	const [filter, setFilter] = useFilter(RECIPE_FILTER_OPTIONS);

	const filteredRecipes = recipes.filter(
		(item) =>
			item && filter?.includes(item.status) && filteredItems.includes(item)
	);

	return (
		<Container>
			<TopBar pageTitle="Recipes">
				<Filter
					filter={filter}
					setFilter={setFilter}
					options={["planned", "not planned"]}
				/>
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
					/>
				</div>
			</TopBar>
			<ListView grid>
				{filteredRecipes.length > 0 ? (
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
		</Container>
	);
};

export default RecipeBoxPage;
