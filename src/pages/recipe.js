import React from "react";
import { useParams } from "react-router-dom";
import { recipes } from "../data/recipes";
import InstructionStep from "../components/recipeComponents/InstructionStep";
import Nav from "../components/Nav";
// import ReadinessCalculation from "../components/calculations/readinessCalculation";

const RecipePage = () => {
	const { id } = useParams();

	const recipe = recipes.find((recipe) => recipe.id === id);

	return recipe ? (
		<div>
			<div className="fixed inset-x-0 top-0 flex justify-between bg-salt">
				<Nav pageTitle={recipe.name} />
				<div>
					<div className="pr-4">{recipe.servings} servings</div>
				</div>
			</div>

			<div className="pt-8">
				<InstructionStep id={id} />
			</div>

			<div>Cook time: {recipe.cookTime}</div>
			<div>Notes:</div>
		</div>
	) : (
		`Recipe not found`
	);
};

export default RecipePage;
