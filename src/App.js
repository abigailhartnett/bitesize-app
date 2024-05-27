import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import supabase from "./config/supabaseClient";
import HomePage from "./pages/home";
import PantryPage from "./pages/pantry";
import RecipeBoxPage from "./pages/recipeBox";
import MealPlanPage from "./pages/mealPlan";
import RecipePage from "./pages/recipe";
import CreateRecipePage from "./pages/createRecipePage";

function App() {
	//Supabase
	const [fetchError, setFetchError] = useState(null);
	const [pantryItems, setPantryItems] = useState(null);
	const [recipes, setRecipes] = useState(null);

	const [filter, setFilter] = useState(["in stock", "out", "low"]);
	const [searchQuery, setSearchQuery] = useState("");
	const [sort, setSort] = useState(null);

	useEffect(() => {
		const fetchPantryItems = async () => {
			const { data, error } = await supabase.from("pantry").select();

			if (error) {
				setFetchError("Could not fetch pantry items");
				setPantryItems(null);
				console.log(fetchError, error);
			}
			if (data) {
				setPantryItems(data);
				setFetchError(null);
			}
		};
		fetchPantryItems();

		const fetchRecipes = async () => {
			const { data, error } = await supabase.from("recipes").select();
			console.log("fetchRecipes", data, error);

			if (error) {
				setFetchError("Could not fetch recipes");
				setRecipes(null);
				console.log(fetchError, error);
			}
			if (data) {
				setRecipes(data);
				setFetchError(null);
			}
		};
		fetchRecipes();
	}, [fetchError, setFetchError]);

	if (!pantryItems || !recipes) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<Router>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/meal-plan" element={<MealPlanPage />} />
					<Route
						path="/pantry"
						element={
							<PantryPage
								filter={filter}
								setFilter={setFilter}
								searchQuery={searchQuery}
								setSearchQuery={setSearchQuery}
								pantryItems={pantryItems}
								setPantryItems={setPantryItems}
								sort={sort}
								setSort={setSort}
							/>
						}
					/>
					<Route
						path="/recipes"
						element={
							<RecipeBoxPage recipes={recipes} pantryItems={pantryItems} />
						}
					/>
					<Route
						path="/recipes/:slug"
						element={<RecipePage recipes={recipes} pantryItems={pantryItems} />}
					/>
					<Route
						path="create-recipe"
						element={
							<CreateRecipePage
								searchQuery={searchQuery}
								setSearchQuery={setSearchQuery}
								pantryItems={pantryItems}
								filter={filter}
							/>
						}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
