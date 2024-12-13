export const usePantryItems = (pantryItems, filter, filteredItems) => {
	const filteredPantryItems = pantryItems.filter(
		(item) =>
			item &&
			(filter?.includes(item.status) || filter?.includes(item.store)) &&
			filteredItems.includes(item)
	);

	const shoppingListItems = pantryItems.filter(
		(item) =>
			item?.onList &&
			(filter?.includes(item.status) || filter?.includes(item.store)) &&
			filteredItems.includes(item)
	);

	return { filteredPantryItems, shoppingListItems };
};
