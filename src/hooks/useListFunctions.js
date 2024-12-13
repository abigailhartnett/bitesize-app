import supabase from "../config/supabaseClient";
import { usePopover } from "bitesize-app/hooks";

export const useListFunctions = (pantryItems, setPantryItems, currentItem) => {
	const { setPopoverIsOpen } = usePopover(pantryItems);

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

	return { toggleOnList, removeItemFromList, clearCheckedItems };
};
