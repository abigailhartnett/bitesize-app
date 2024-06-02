import React, { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";
import { useParams } from "react-router-dom";
import { useToggleOnList } from "../hooks/useToggleOnList";
import Nav from "../components/Nav";
import PantryItem from "../components/PantryItem";
import Menu from "../components/Menu";
import ListView from "../components/ListView";
import TopBar from "../components/TopBar";

const RecipePage = ({ recipes, pantryItems, setPantryItems }) => {
	const { slug } = useParams();
	const [recipeIngredients, setRecipeIngredients] = useState(null);
	const [fetchError, setFetchError] = useState(null);

	const toggle = useToggleOnList(pantryItems, setPantryItems);

	useEffect(() => {
		const fetchRecipeIngredients = async () => {
			const { data, error } = await supabase.from("recipeIngredients").select();

			if (error) {
				setFetchError("Could not fetch pantry recipe ingredients");
				setRecipeIngredients(null);
				console.log(fetchError, error);
			}
			if (data) {
				setRecipeIngredients(data);
				setFetchError(null);
			}
		};
		fetchRecipeIngredients();
	}, [fetchError, setFetchError]);

	if (!recipeIngredients) {
		return <div>Loading...</div>;
	}

	const recipe = recipes.find((recipe) => recipe.slug === slug);

	const recipeIngredientsList = recipeIngredients.filter(
		(item) => item.recipe_slug === slug
	);

	return (
		<div className="fixed inset-x-0 top-0 flex flex-col justify-between">
			<TopBar>
				<Nav pageTitle={recipe.title} link="/recipes" />
			</TopBar>
			<ListView>
				<div className="pt-8">
					<div>
						<div className="pt-4 font-semibold">Ingredients:</div>
						<div>
							{recipeIngredientsList.map((recipeIngredient, id) => {
								const pantryItem = pantryItems.find(
									(item) => item.name === recipeIngredient.name
								);
								if (pantryItem) {
									return (
										<PantryItem
											key={id}
											item={pantryItem}
											toggleOnList={() => toggle(pantryItem.name)}
											pantryItems={pantryItems}
											setPantryItems={setPantryItems}
										/>
									);
								}
								return null;
							})}
						</div>
					</div>
					<div className="mt-8">
						<h3 className="font-semibold">Instructions:</h3>
						<div>{recipe.instructions}</div>
					</div>
				</div>
			</ListView>
			<div className="fixed inset-x-0 bottom-0">
				<Menu />
			</div>
		</div>
	);
};

export default RecipePage;
