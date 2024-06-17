import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import RecipeItem from "../components/RecipeItem";
import { useSearch } from "../hooks/useSearch";
import ListView from "../components/ListView";
import IconButton from "../components/buttons/IconButton";
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
			<TopBar pageTitle="Meal Plan" />
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
				<SearchBar
					id={"searchInput"}
					placeholder={"Search meal plan..."}
					setSearchQuery={setSearchQuery}
				/>
				<IconButton
					icon="fa-plus"
					onClick={() => navigate("/create-recipe")}
					className="bg-[#e9e9e9]"
					type="fa-solid"
					size="lg"
				/>
			</BottomBar>
		</Container>
	);
};

export default MealPlanPage;
