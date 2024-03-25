import React, { useState, useEffect } from "react";
import { recipes } from "../../data/recipes";
import { pantry } from "../../data/pantry";

const ReadinessCalculation = ({ id }) => {
	const [readiness, setReadiness] = useState(0);

	const recipe = recipes.find((recipe) => recipe.id === id);
	const recipeIngredients = recipe.steps.map((step) => step.ingredients).flat();

	const pantryIngredientsInStock = pantry.filter((item) => {
		if (item.status === "in stock") {
			return item;
		} else {
			return null;
		}
	});

	const recipeIngredientsInStock = recipeIngredients.filter((item) => {
		return pantryIngredientsInStock.some(
			(pantryItem) => pantryItem.name === item.name
		);
	});

	setReadiness(
		Math.floor(
			(recipeIngredientsInStock.length / recipeIngredients.length) * 100
		)
	);

	useEffect(() => {
		setReadiness(
			Math.floor(
				(recipeIngredientsInStock.length / recipeIngredients.length) * 100
			)
		);
	}, []);

	return (
		<div>
			<div>{readiness}% ready</div>
		</div>
	);
};

export default ReadinessCalculation;
