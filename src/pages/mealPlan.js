import React from "react";

import {
	SearchBar,
	RecipeItem,
	ListView,
	TopBar,
	Container,
	Menu,
} from "bitesize-app/components";

import { useSearch } from "bitesize-app/hooks";

const MealPlanPage = ({ recipes }) => {
	const [filteredItems, setSearchQuery] = useSearch(recipes, "title");

	const filteredRecipes = recipes.filter(
		(item) => item && item.status === "planned" && filteredItems.includes(item)
	);

	return (
		<Container>
			<TopBar pageTitle="Meal Plan">
				<SearchBar
					id={"searchInput"}
					placeholder={"Search meal plan..."}
					setSearchQuery={setSearchQuery}
				/>
			</TopBar>
			<ListView>
				{filteredRecipes.length > 0 ? (
					filteredRecipes.map((item) => <RecipeItem item={item} />)
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

export default MealPlanPage;
