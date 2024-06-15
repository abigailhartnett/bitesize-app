import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import RecipeItem from "../components/RecipeItem";
import { useSearch } from "../hooks/useSearch";
import ListView from "../components/ListView";
import Menu from "../components/Menu";
import Button from "../components/buttons/Button";
import TopBar from "../components/TopBar";
import Container from "../components/Container";
import BottomBar from "../components/BottomBar";

const MealPlanPage = ({ recipes }) => {
	const navigate = useNavigate();
	const [filteredItems, setSearchQuery] = useSearch(recipes, "title");

	const filteredRecipes = recipes.filter(
		(item) => item && item.status === "planned" && filteredItems.includes(item)
	);

	return (
		<Container>
			<TopBar pageTitle="Meal Plan"></TopBar>
			<ListView>
				{filteredRecipes.length > 0 ? (
					filteredRecipes.map((item) => <RecipeItem item={item} />)
				) : (
					<div className="text-center pt-4">
						<span>Whoops! No items found 😱</span>
					</div>
				)}
			</ListView>
			<BottomBar>
				<Button onClick={() => navigate("/create-recipe")}>
					Create new recipe
				</Button>
				<SearchBar
					id={"searchInput"}
					placeholder={"Search pantry..."}
					setSearchQuery={setSearchQuery}
				/>
				<Menu />
			</BottomBar>
		</Container>
	);
};

export default MealPlanPage;
