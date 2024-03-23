import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import PantryPage from "./pages/pantry";
import RecipeBoxPage from "./pages/recipeBox";
import MealPlanPage from "./pages/mealPlan";
import ShoppingListPage from "./pages/shoppingList";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/meal-plan" element={<MealPlanPage />} />
					<Route path="/pantry" element={<PantryPage />} />
					<Route path="/recipe-box" element={<RecipeBoxPage />} />
					<Route path="/shopping-list" element={<ShoppingListPage />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
