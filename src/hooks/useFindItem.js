export const useFindItem = (pantryItems) => {
	const findItemById = (id) => {
		const item = pantryItems?.find((item) => item.id === id);
		if (!item) {
			console.log(`Item with id ${id} not found`);
			return;
		}
		return item;
	};

	return findItemById;
};
