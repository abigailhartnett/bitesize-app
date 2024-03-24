import React from "react";
import { pantry } from "../data/pantry";
import PantryItem from "./PantryItem";

const ShoppingList = () => {
	const pantryItems = pantry.map((item) => {
		return (
			item.onList && (
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
