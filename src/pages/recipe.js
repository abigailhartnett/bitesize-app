import React, { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";
import { useParams } from "react-router-dom";
// import { recipes } from "../data/recipes";
// import InstructionStep from "../components/recipeComponents/InstructionStep";
import Nav from "../components/Nav";
// import ReadinessCalculation from "../components/calculations/readinessCalculation";

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
				{/* <InstructionStep pantryItems={pantryItems} id={recipe.id} /> */}
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
			{/* <div className="pt-4">Cook time: {recipe.cookTime}</div> */}
			{/* <div className="pt-4">Notes:</div> */}
		</div>
	) : (
		`Recipe not found`
	);
};

export default RecipePage;
