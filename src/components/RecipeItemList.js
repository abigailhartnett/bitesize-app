import React from "react";
import PantryItem from "./PantryItem";
import supabase from "../config/supabaseClient";
import { useToggleOnList } from "../hooks/useToggleOnList";

const RecipeItemList = ({
	pantryItems,
	setPantryItems,
	recipeIngredientsList,
	// filteredPantryItems,
	// showShoppingList,
	openPopover,
	// addToRecipe,
	// currentPage,
	// aisle,
	// status,
	// toggleButton,
	recipeIngredients,
	setRecipeIngredients,
	checkbox,
	// slug,
	status,
}) => {
	const toggle = useToggleOnList(pantryItems, setPantryItems);

	return recipeIngredientsList?.map((recipeIngredient) => {
		// const pantryItem = pantryItems.find(
		// 	(item) => item.name === recipeIngredient.name
		// );

		const checkOffItem = async (isChecked, id) => {
			// Find Item
			const item = recipeIngredients.find((item) => item.id === id);

			// Toggle checked property
			const updatedItem = {
				...item,
				checked: isChecked,
			};

			// Update the item in the state
			setRecipeIngredients((prevItems) =>
				prevItems?.map((item) => (item.id === id ? updatedItem : item))
			);

			// Update the item in Supabase
			const { error } = await supabase
				.from("recipeIngredients")
				.update({ checked: updatedItem.checked })
				.eq("id", id);

			if (error) {
				console.log(error);
			}
		};

		return (
			<PantryItem
				item={recipeIngredient}
				toggleOnList={() => toggle(recipeIngredient.name)}
				// addToRecipe={() => addToRecipe(recipeIngredient.id)}
				checkbox={checkbox}
				// showShoppingList={showShoppingList}
				openPopover={() => openPopover(recipeIngredient.id)}
				onChange={(e) => checkOffItem(e.target.checked, recipeIngredient.id)}
				// currentPage={currentPage}
				pantryItems={pantryItems}
				setPantryItems={setPantryItems}
				// aisle={aisle}
				status={status}
				// toggleButton={toggleButton}
				amount={recipeIngredient.amount}
				unit={recipeIngredient.unit}
			/>
		);
	});
};

export default RecipeItemList;
