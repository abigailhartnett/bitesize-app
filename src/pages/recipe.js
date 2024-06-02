import React, { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";

const RecipePage = ({ recipes }) => {
	const { slug } = useParams();
	const [recipeIngredients, setRecipeIngredients] = useState(null);
	const [fetchError, setFetchError] = useState(null);

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

	return recipe ? (
		<div>
			<div className="fixed inset-x-0 top-0 flex justify-between bg-salt">
				<Nav pageTitle={recipe.title} link="/recipes" />
				<div>
					<div className="pr-4">{recipe.servings} servings</div>
				</div>
			</div>

			<div className="pt-8 flex gap-2">
				<div>
					<div className="pt-4 font-semibold">Ingredients:</div>
					<div>
						{recipeIngredientsList.map((item, id) => (
							<div className="flex gap-1">
								<input type="checkbox" />
								<p key={id}>{item.pantry_item_name}</p>
							</div>
						))}
					</div>
				</div>
				<div className="pt-4">
					<h3 className="font-semibold">Instructions:</h3>
					<div>{recipe.instructions}</div>
				</div>
			</div>
		</div>
	) : (
		`Recipe not found`
	);
};

export default RecipePage;
