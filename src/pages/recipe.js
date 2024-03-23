import React from "react";
import { useParams } from "react-router-dom";
import { recipes } from "../data/recipes";
import InstructionStep from "../components/recipeComponents/InstructionStep";
import Nav from "../components/Nav";

const RecipePage = () => {
	const { id } = useParams();

	const recipe = recipes.find((recipe) => recipe.id === id);

	return recipe ? (
		<div>
			<Nav pageTitle={recipe.name} />
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
