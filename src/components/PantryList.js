import React, { useState } from "react";
import supabase from "../config/supabaseClient";
import PantryItem from "./PantryItem";

const PantryList = ({
	filter,
	searchFilter,
	sort,
	pantryItems,
	setPantryItems,
	toggleShoppingList,
}) => {
	const filteredPantryItems =
		sort &&
		sort.filter(
			(item) =>
				filter.includes(item.status) &&
				searchFilter?.some((searchItem) => searchItem.id === item.id)
		);

	const pantryItemList = filteredPantryItems.map((item) => {
		// const checkOffItem = (isChecked, id) => {
		// 	const index = pantryItems.findIndex((item) => item.id === id);
		// 	if (isChecked) {
		// 		const updatedItem = {
		// 			...pantryItems[index],
		// 			onList: false,
		// 			status: "in stock",
		// 		};
		// 		setPantryItems((prevItems) => {
		// 			const updatedItems = [...prevItems];
		// 			updatedItems[index] = updatedItem;
		// 			return updatedItems;
		// 		});
		// 		setShoppingList(pantryItems.onList.filter((item) => item.id !== id));
		// 	}
		// };

		return <></>;
	});

	// const clearList = () => {
	// 	setPantryItems((prevItems) =>
	// 		prevItems.map((item) => ({ ...item, onList: false }))
	// 	);
	// 	setShoppingList([]);
	// };

	return <div>{pantryItemList}</div>;
};

export default PantryList;
