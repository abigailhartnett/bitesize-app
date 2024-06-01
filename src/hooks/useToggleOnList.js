import supabase from "../config/supabaseClient";

export const useToggleOnList = (pantryItems, setPantryItems) => {
	return async (id) => {
		// Find the item
		const item = pantryItems?.find((item) => item.id === id);
		if (!item) {
			console.log(`Item with id ${id} not found`);
			return;
		}

		// Toggle the onList property
		const updatedItem = { ...item, onList: !item.onList, checked: false };

		// Update the item in the state
		setPantryItems((prevItems) =>
			prevItems?.map((item) => (item.id === id ? updatedItem : item))
		);

		// Update the item in Supabase
		const { error } = await supabase
			.from("pantry")
			.update({ onList: updatedItem.onList, checked: updatedItem.checked })
			.eq("id", id);

		if (error) {
			console.log(error);
		}
	};
};
