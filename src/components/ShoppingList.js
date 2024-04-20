import React from "react";
import { pantry } from "../data/pantry";
import PantryItem from "./PantryItem";

const ShoppingList = ({ filter, shoppingList }) => {
	const pantryItems = pantry.map((item) => {
		return (
			item.onList &&
			filter.includes(item.status) && (
				<PantryItem
					icon={item.icon}
					name={item.name}
					aisle={item.aisle}
					status={item.status}
				/>
			)
		);
	});

	return <div>{pantryItems}</div>;
};

export default ShoppingList;
