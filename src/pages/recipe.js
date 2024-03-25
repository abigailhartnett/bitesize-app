import React from "react";
import { useParams } from "react-router-dom";
import { recipes } from "../data/recipes";
import InstructionStep from "../components/recipeComponents/InstructionStep";
import Nav from "../components/Nav";
import ReadinessCalculation from "../components/calculations/readinessCalculation";

const RecipePage = () => {
	const { id } = useParams();

	const recipe = recipes.find((recipe) => recipe.id === id);

	return recipe ? (
		<div>
			<Nav pageTitle={recipe.name} />
			<div>Servings: {recipe.servings}</div>
			<ReadinessCalculation id={id} />

			<InstructionStep id={id} />

			<div>Cook time: {recipe.cookTime}</div>
			<div>Notes:</div>
		</div>
	) : (
		`Recipe not found`
	);
};

export default RecipePage;
