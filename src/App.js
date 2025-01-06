import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import "./icons";
import PantryPage from "./pages/pantry";
import RecipeBoxPage from "./pages/recipeBox";
import RecipePage from "./pages/recipe";
import CreateRecipePage from "./pages/createRecipePage";
import ListPage from "./components/pages/list-page/ListPage";
import ShoppingListPage from "./pages/shoppingList";
import MealPlanPage from "./pages/mealPlan";
import CookRecipePage from "./pages/cookrecipe";
import { PantryProvider } from "./contexts/PantryContext";

function App() {
	return (
		<PantryProvider>
			<Router>
				<Routes>
					<Route path="/" element={<Navigate to="/pantry" />} />
					<Route path="/pantry" element={<PantryPage />} />
					<Route path="/recipes" element={<RecipeBoxPage />} />
					<Route path="/recipes/:slug" element={<RecipePage />} />
					<Route path="/cook-recipe/:slug" element={<CookRecipePage />} />
					<Route path="create-recipe" element={<CreateRecipePage />} />
					<Route path="/list-page" element={<ListPage />} />
					<Route path="/shopping-list" element={<ShoppingListPage />} />
					<Route path="/meal-plan" element={<MealPlanPage />} />
				</Routes>
			</Router>
		</PantryProvider>
	);
}

export default App;
