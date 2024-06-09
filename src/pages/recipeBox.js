import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import RecipeItem from "../components/RecipeItem";
import { useSearch } from "../hooks/useSearch";
import { useFilter } from "../hooks/useFilter";
import ListView from "../components/ListView";
import Menu from "../components/Menu";
import Button from "../components/buttons/Button";
import TopBar from "../components/TopBar";
import Container from "../components/Container";
import Filter from "../components/Filter";
import BottomBar from "../components/BottomBar";

const RecipeBoxPage = ({ recipes }) => {
	const navigate = useNavigate();
	const [filteredItems, setSearchQuery] = useSearch(recipes, "title");

	const filterOptions = ["planned", "not planned"];
	const [filter, setFilter] = useFilter(filterOptions);

	const filteredRecipes = recipes.filter(
		(item) =>
			item && filter?.includes(item.status) && filteredItems.includes(item)
	);

	return (
		<Container>
			<TopBar pageTitle="Recipes"></TopBar>
			<Filter
				filter={filter}
				setFilter={setFilter}
				options={["planned", "not planned"]}
			/>
			<ListView>
				{filteredRecipes.length > 0 ? (
					filteredRecipes.map((item) => (
						<RecipeItem item={item} slug={item.slug} />
					))
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

export default RecipeBoxPage;
