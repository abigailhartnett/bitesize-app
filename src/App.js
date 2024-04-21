import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import supabase from "./config/supabaseClient";
import HomePage from "./pages/home";
import PantryPage from "./pages/pantry";
import RecipeBoxPage from "./pages/recipeBox";
import MealPlanPage from "./pages/mealPlan";
// import ShoppingListPage from "./pages/shoppingList";
import RecipePage from "./pages/recipe";
import { pantry } from "./data/pantry";

function App() {
	//Supabase
	const [setFetchError] = useState(null);
	const [pantryItems, setPantryItems] = useState(null);
	const [searchFilter, setSearchFilter] = useState(null);
	const [sort, setSort] = useState(null);

	const [filter, setFilter] = useState(["in stock", "out", "low"]);
	const [searchQuery, setSearchQuery] = useState("");
	const [shoppingList, setShoppingList] = useState([]);

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
	}, []);

	useEffect(() => {
		if (pantryItems) {
			setSearchFilter(pantryItems);
			setSort(pantryItems);
		}
	}, [pantryItems]);

	useEffect(() => {
		if (pantryItems) {
			const itemsOnList = pantry.filter((item) => item.onList === true);
			setShoppingList(itemsOnList);
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
								searchFilter={searchFilter}
								setSearchFilter={setSearchFilter}
								pantryItems={pantryItems}
								setPantryItems={setPantryItems}
								setShoppingList={setShoppingList}
								shoppingList={shoppingList}
								sort={sort}
								setSort={setSort}
							/>
						}
					/>
					<Route path="/recipe-box" element={<RecipeBoxPage />} />
					{/* <Route
						path="/shopping-list"
						element={
							<ShoppingListPage
								filter={filter}
								setFilter={setFilter}
								shoppingList={shoppingList}
								setShoppingList={setShoppingList}
							/>
						}
					/> */}
					<Route path="/recipes/:id" element={<RecipePage />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
