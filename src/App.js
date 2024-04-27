import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import supabase from "./config/supabaseClient";
import HomePage from "./pages/home";
import PantryPage from "./pages/pantry";
import RecipeBoxPage from "./pages/recipeBox";
import MealPlanPage from "./pages/mealPlan";
import RecipePage from "./pages/recipe";

function App() {
	//Supabase
	const [fetchError, setFetchError] = useState(null);
	const [pantryItems, setPantryItems] = useState(null);
	const [filter, setFilter] = useState(["in stock", "out", "low"]);

	const [search, setSearch] = useState(null);
	const [sort, setSort] = useState(null);

	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		const fetchPantryItems = async () => {
			const { data, error } = await supabase.from("pantry").select();

			if (error) {
				setFetchError("Could not fetch pantry items");
				setPantryItems(null);
				console.log(error);
			}
			if (data) {
				setPantryItems(data);
				setFetchError(null);
			}
		};
		fetchPantryItems();
	}, [setFetchError]);

	useEffect(() => {
		if (pantryItems) {
			setSearch(pantryItems);
			setSort(pantryItems);
		}
	}, [pantryItems]);

	if (!pantryItems) {
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
								search={search}
								setSearch={setSearch}
								pantryItems={pantryItems}
								setPantryItems={setPantryItems}
								sort={sort}
								setSort={setSort}
							/>
						}
					/>
					<Route path="/recipe-box" element={<RecipeBoxPage />} />
					<Route path="/recipes/:id" element={<RecipePage />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
