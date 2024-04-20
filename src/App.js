import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import PantryPage from "./pages/pantry";
import RecipeBoxPage from "./pages/recipeBox";
import MealPlanPage from "./pages/mealPlan";
import ShoppingListPage from "./pages/shoppingList";
import RecipePage from "./pages/recipe";
import { useState, useEffect } from "react";
import { pantry } from "./data/pantry";

function App() {
	const [filter, setFilter] = useState(["in stock", "out", "low"]);
	const [shoppingList, setShoppingList] = useState([]);
	const [pantryItems, setPantryItems] = useState(pantry);

	useEffect(() => {
		const itemsOnList = pantry.filter((item) => item.onList === true);
		setShoppingList(itemsOnList);
	}, []);

	useEffect(() => {
		console.log(shoppingList);
	}, [shoppingList]);

	return (
		<div>
			<Router>
				{console.log(shoppingList)}
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/meal-plan" element={<MealPlanPage />} />
					<Route
						path="/pantry"
						element={
							<PantryPage
								filter={filter}
								setFilter={setFilter}
								pantryItems={pantryItems}
								setPantryItems={setPantryItems}
								setShoppingList={setShoppingList}
								shoppingList={shoppingList}
							/>
						}
					/>
					<Route path="/recipe-box" element={<RecipeBoxPage />} />
					<Route
						path="/shopping-list"
						element={
							<ShoppingListPage
								filter={filter}
								setFilter={setFilter}
								shoppingList={shoppingList}
								setShoppingList={setShoppingList}
							/>
						}
					/>
					<Route path="/recipes/:id" element={<RecipePage />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
