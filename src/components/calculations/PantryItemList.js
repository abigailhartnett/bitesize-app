import React from "react";
import PantryItem from "../PantryItem";
import supabase from "../../config/supabaseClient";
import { useToggleOnList } from "../../hooks/useToggleOnList";

const PantryItemList = ({
	pantryItems,
	setPantryItems,
	filteredPantryItems,
	showShoppingList,
	openPopover,
	addToRecipe,
	currentPage,
	aisle,
	status,
	toggleButton,
	checkbox,
	recipeIngredient,
}) => {
	const toggle = useToggleOnList(pantryItems, setPantryItems);

	return filteredPantryItems?.map((item) => {
		const checkOffItem = async (isChecked, id) => {
			// Find Item
			const item = pantryItems.find((item) => item.id === id);

			// Toggle the onList and status properties
			const updatedItem = {
				...item,
				checked: isChecked,
				status: isChecked ? "in stock" : item.prevStatus,
			};

			// Update the item in the state
			setPantryItems((prevItems) =>
				prevItems?.map((item) => (item.id === id ? updatedItem : item))
			);

			// Update the item in Supabase
			const { error } = await supabase
				.from("pantry")
				.update({ status: updatedItem.status, checked: updatedItem.checked })
				.eq("id", id);

			if (error) {
				console.log(error);
			}
		};

		return (
			<PantryItem
				item={item}
				toggleOnList={() => toggle(item.name)}
				addToRecipe={() => addToRecipe(item.id)}
				checkbox={checkbox}
				showShoppingList={showShoppingList}
				openPopover={() => openPopover(item.id)}
				onChange={(e) => checkOffItem(e.target.checked, item.id)}
				currentPage={currentPage}
				pantryItems={pantryItems}
				setPantryItems={setPantryItems}
				aisle={aisle}
				status={status}
				toggleButton={toggleButton}
				recipeIngredient={recipeIngredient}
			/>
		);
	});
};

export default PantryItemList;
