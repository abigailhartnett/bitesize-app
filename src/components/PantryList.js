import React from "react";
import { pantry } from "../data/pantry";
import PantryItem from "./PantryItem";

const PantryList = ({ pantryOptions }) => {
	const pantryItems = pantryOptions.map((item) => {
		return (
			<PantryItem
				icon={item.icon}
				name={item.name}
				aisle={item.aisle}
				status={item.status}
			/>
		);
	});
	return <div>{pantryItems}</div>;
};

export default PantryList;
