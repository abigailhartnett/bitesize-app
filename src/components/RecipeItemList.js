import React from "react";
import supabase from "../config/supabaseClient";
// import { useToggleOnList } from "../hooks/useToggleOnList";

import { PantryItem } from "bitesize-app/components";

const RecipeItemList = ({
	pantryItems,
	setPantryItems,
	recipeIngredientsList,
	// filteredPantryItems,
	// showShoppingList,
	openPopover,
	// addToRecipe,
	// status,
	// toggleButton,
	recipeIngredients,
	setRecipeIngredients,
	checkbox,
	// slug,
	status,
	ingredient,
}) => {
	// const toggle = useToggleOnList(pantryItems, setPantryItems);

	return recipeIngredientsList?.map((recipeIngredient) => {
		const pantryItem = pantryItems.find(
			(item) => item.name === recipeIngredient.name
		);

		const recipeItem = recipeIngredients.find(
			(item) => item.id === recipeIngredient.id
		);

		const checkOffItem = async (isChecked, id) => {
			// Find Item
			const recipeItemToUpdate = recipeIngredients.find(
				(item) => item.id === id
			);

			// Toggle checked property
			const updatedRecipeItem = {
				...recipeItemToUpdate,
				ingredient_checked: isChecked,
			};

			// Update the item in the state
			setRecipeIngredients((prevItems) =>
				prevItems?.map((item) => (item.id === id ? updatedRecipeItem : item))
			);

			// Update the item in Supabase
			const { error } = await supabase
				.from("recipeIngredients")
				.update({ ingredient_checked: updatedRecipeItem.ingredient_checked })
				.eq("id", id);

			if (error) {
				console.log(error);
			}

			console.log(isChecked);
		};

		return (
			<PantryItem
				item={pantryItem}
				ingredientItem={recipeItem}
				// toggleOnList={() => toggle(pantryItem.name)}
				// addToRecipe={() => addToRecipe(recipeIngredient.id)}
				checkbox={checkbox}
				// showShoppingList={showShoppingList}
				openPopover={() => openPopover(recipeIngredient.id)}
				onChange={(e) => checkOffItem(e.target.checked, recipeIngredient?.id)}
				// pantryItems={pantryItems}
				// setPantryItems={setPantryItems}
				status={status}
				// toggleButton={toggleButton}
				amount={recipeIngredient.amount}
				unit={recipeIngredient.unit}
				ingredient={ingredient}
			/>
		);
	});
};

export default React.memo(RecipeItemList);
