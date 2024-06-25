import React from "react";
import SearchBar from "../components/SearchBar";
import RecipeItem from "../components/RecipeItem";
import { useSearch } from "../hooks/useSearch";
import ListView from "../components/ListView";
import TopBar from "../components/TopBar";
import Container from "../components/Container";
import Menu from "../components/Menu";

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
