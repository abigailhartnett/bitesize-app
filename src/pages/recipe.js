import React from "react";
import { useParams } from "react-router-dom";
import { recipes } from "../data/recipes";
import InstructionStep from "../components/recipeComponents/InstructionStep";

const RecipePage = () => {
	const { id } = useParams();

	const recipe = recipes.find((recipe) => recipe.id === id);

	return recipe ? (
		<div>
			<h1>{recipe.name}</h1>
			<div>Servings: {recipe.servings}</div>
			<div className="pt-4">{recipe.readiness} ready</div>

			<InstructionStep id={id} />

			<div className="pt-10">Cook time: {recipe.cookTime}</div>
			<div>Notes:</div>
		</div>
	) : (
		`Recipe not found`
	);
};

export default RecipePage;
