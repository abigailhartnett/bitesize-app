import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import RecipeItem from "../components/RecipeItem";
import { useSearch } from "../hooks/useSearch";
import ListView from "../components/ListView";
import Menu from "../components/Menu";
import Button from "../components/buttons/Button";
import TopBar from "../components/TopBar";

const RecipeBoxPage = ({ recipes }) => {
	const navigate = useNavigate();
	const [filteredItems, setSearchQuery] = useSearch(recipes, "title");

	const filteredRecipes = recipes.filter((item) =>
		filteredItems.includes(item)
	);

	return (
		<div className="fixed inset-x-0 top-0 flex flex-col justify-between">
			<TopBar pageTitle="Recipes"></TopBar>
			<ListView>
				{filteredRecipes.length > 0 ? (
					filteredRecipes.map((item) => (
						<RecipeItem title={item.title} slug={item.slug} id={item.id} />
					))
				) : (
					<div className="text-center pt-4">
						<span>Whoops! No items found 😱</span>
					</div>
				)}
			</ListView>
			<div className="fixed inset-x-0 bottom-0">
				<Button onClick={() => navigate("/create-recipe")}>
					Create new recipe
				</Button>
				<SearchBar
					id={"searchInput"}
					placeholder={"Search pantry..."}
					setSearchQuery={setSearchQuery}
				/>

				<Menu />
			</div>
		</div>
	);
};

export default RecipeBoxPage;
