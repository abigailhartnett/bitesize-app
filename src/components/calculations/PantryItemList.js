import React from "react";
import PantryItem from "../PantryItem";
// import { useLocation } from "react-router-dom";

const PantryItemList = ({
	filteredPantryItems,
	toggleOnList,
	toggleShoppingList,
	openPopover,
	checkOffItem,
	toggleStatus,
	addToRecipe,
	currentPage,
}) => {
	return filteredPantryItems.map((item) => {
		return (
			<PantryItem
				item={item}
				id={item.id}
				key={item.id}
				icon={item.icon}
				name={item.name}
				aisle={item.aisle}
				status={item.status}
				onList={item.onList}
				toggleOnList={() => toggleOnList(item.id)}
				addToRecipe={() => addToRecipe(item.id)}
				checkbox={true}
				toggleShoppingList={toggleShoppingList}
				toggleStatus={() => toggleStatus(item.id)}
				openPopover={() => openPopover(item.id)}
				onChange={(e) => checkOffItem(e.target.checked, item.id)}
				currentPage={currentPage}
			/>
		);
	});
};

export default PantryItemList;
