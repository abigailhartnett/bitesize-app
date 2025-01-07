import supabase from "../config/supabaseClient";
import { usePantry } from "../contexts/PantryContext";
import { usePopover } from "bitesize-app/hooks";

export const useListFunctions = (currentItem) => {
	const {
		pantryItems,
		setPantryItems,
		recipeIngredients,
		setRecipeIngredients,
	} = usePantry();
	const { setPopoverIsOpen } = usePopover();

	const toggleOnList = async (name) => {
		// Find the item
		const item = pantryItems?.find((item) => item.name === name);
		if (!item) {
			console.log(`Item with name ${name} not found`);
			return;
		}

		// Toggle the onList property
		const updatedItem = { ...item, onList: !item.onList, checked: false };

		// Update the item in the state
		setPantryItems((prevItems) =>
			prevItems?.map((item) => (item.name === name ? updatedItem : item))
		);

		// Update the item in Supabase
		const { error } = await supabase
			.from("pantry")
			.update({ onList: updatedItem.onList, checked: updatedItem.checked })
			.eq("name", name);

		if (error) {
			console.log(error);
		}
	};

	const removeItemFromList = () => {
		toggleOnList(currentItem.name);
		setPopoverIsOpen(false);
	};

	const clearCheckedItems = async () => {
		const itemsOnList = pantryItems?.filter(
			(item) => item.onList && item.checked
		);

		// Find Items
		for (const item of itemsOnList) {
			// Toggle the onList and status properties
			const updatedItem = { ...item, onList: false, prevStatus: item.status };

			// Update the item in the state
			setPantryItems((prevItems) =>
				prevItems.map((prevItem) =>
					prevItem.id === item.id ? updatedItem : prevItem
				)
			);

			// Update the item in Supabase
			const { error } = await supabase
				.from("pantry")
				.update({
					onList: updatedItem.onList,
					prevStatus: updatedItem.prevStatus,
				})
				.eq("id", item.id);

			if (error) {
				console.log(error);
			}
		}

		setPopoverIsOpen(false);
	};

	const clearCheckedIngredients = async (slug) => {
		const recipeIngredientsList = recipeIngredients?.filter(
			(item) => item.recipe_slug === slug
		);

		const checkedIngredients = recipeIngredientsList.filter(
			(item) => item.ingredient_checked === true
		);

		checkedIngredients.forEach(async (ingredient) => {
			const { error } = await supabase
				.from("recipeIngredients")
				.update({ ingredient_checked: false })
				.eq("id", ingredient.id);

			if (error) {
				console.error("Error updating ingredient:", error);
			}

			const updatedIngredients = recipeIngredientsList.map((item) =>
				item.id === ingredient.id
					? { ...item, ingredient_checked: false }
					: item
			);

			setRecipeIngredients(updatedIngredients);
		});
	};

	return {
		toggleOnList,
		removeItemFromList,
		clearCheckedItems,
		clearCheckedIngredients,
	};
};
