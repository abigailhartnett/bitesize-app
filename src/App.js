import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import PantryPage from "./pages/pantry";
import RecipeBoxPage from "./pages/recipeBox";
import MealPlanPage from "./pages/mealPlan";
import ShoppingListPage from "./pages/shoppingList";
import RecipePage from "./pages/recipe";

function App() {
	return (
		<div>
			<Router>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/meal-plan" element={<MealPlanPage />} />
					<Route path="/pantry" element={<PantryPage />} />
					<Route path="/recipe-box" element={<RecipeBoxPage />} />
					<Route path="/shopping-list" element={<ShoppingListPage />} />
					<Route path="/recipes/:id" element={<RecipePage />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
