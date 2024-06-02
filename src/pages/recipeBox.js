import React from "react";
import { useNavigate } from "react-router-dom";
// import supabase from "../config/supabaseClient";
import Nav from "../components/Nav";
import SearchBar from "../components/SearchBar";
import Sort from "../components/Sort";
import RecipeItem from "../components/RecipeItem";
// import Filter from "../components/Filter";
import { useSearch } from "../hooks/useSearch";

const RecipeBoxPage = ({ recipes }) => {
	const navigate = useNavigate();
	const [searchItem, setSearchQuery] = useSearch();

	const filteredRecipes = recipes.filter((item) =>
		// filter.includes(item.status) &&
		searchItem(item.title)
	);

	return (
		<div className="fixed inset-x-0 top-0 flex flex-col justify-between min-h-screen">
			<div class="border-solid border-black border-2 border-t-0 border-x-0 bg-white py-2">
				<div class="flex justify-between pb-2 mr-3">
					<Nav pageTitle="Recipe Box" link="/" />
					<Sort sortType="Recipes" />
				</div>
				{/* <Filter filterBy="recipes" /> */}
			</div>
			<div className="h-screen overflow-y-auto overflow-x-visible flex-grow pb-56">
				{/* RECIPES */}
				{filteredRecipes.length > 0 ? (
					filteredRecipes.map((item) => (
						<RecipeItem
							title={item.title}
							// readiness={item.readiness}
							slug={item.slug}
							id={item.id}
						/>
					))
				) : (
					<div className="text-center pt-4">
						<span>Whoops! No items found 😱</span>
					</div>
				)}
			</div>
			<div className="fixed inset-x-0 bottom-0">
				{/* SEARCH BAR */}
				<SearchBar
					id={"searchInput"}
					placeholder={"Search pantry..."}
					recipes={recipes}
				/>
				{/* SEARCH BAR */}
				<div className="bg-gray-200 p-4">
					<div className="flex items-center justify-between gap-1">
						<button
							className="bg-pepper text-salt font-medium p-2 w-full"
							onClick={() => navigate("/create-recipe")}
						>
							Create Recipe
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecipeBoxPage;
