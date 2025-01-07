import { usePantry } from "../contexts/PantryContext";

export const usePantryItems = (filter, filteredItems) => {
	const { pantryItems } = usePantry();

	const filteredPantryItems = pantryItems?.filter(
		(item) =>
			item &&
			(filter?.includes(item.status) || filter?.includes(item.store)) &&
			filteredItems?.includes(item)
	);

	const shoppingListItems = pantryItems?.filter(
		(item) =>
			item?.onList &&
			(filter?.includes(item.status) || filter?.includes(item.store)) &&
			filteredItems?.includes(item)
	);

	return { filteredPantryItems, shoppingListItems };
};
