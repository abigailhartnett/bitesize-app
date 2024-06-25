import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import RecipeItem from "../components/RecipeItem";
import { useSearch } from "../hooks/useSearch";
import { useFilter } from "../hooks/useFilter";
import ListView from "../components/ListView";
import IconButton from "../components/buttons/IconButton";
import TopBar from "../components/TopBar";
import Container from "../components/Container";
import Filter from "../components/Filter";
import BottomBar from "../components/BottomBar";
import Menu from "../components/Menu";

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
				<IconButton
					icon="fa-plus"
					onClick={() => navigate("/create-recipe")}
					variant={"primary"}
					className="absolute bottom-24 right-4"
					faStyle="fa-solid"
					size="lg"
				/>
			</ListView>
			<Menu />
		</Container>
	);
};

export default RecipeBoxPage;
