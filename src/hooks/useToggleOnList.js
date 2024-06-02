import supabase from "../config/supabaseClient";

export const useToggleOnList = (pantryItems, setPantryItems) => {
	return async (name) => {
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
};
