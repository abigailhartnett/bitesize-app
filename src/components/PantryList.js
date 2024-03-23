import React from "react";
import { pantry } from "../data/pantry";
import PantryItem from "./PantryItem";

const PantryList = () => {
	const pantryItems = pantry.map((item) => {
		return (
			<PantryItem
				icon={item.icon}
				name={item.name}
				aisle={item.aisle}
				status={item.status}
			/>
		);
	});

	return (
		<div>
			<div className="border-solid border-black border-2 border-b-0 border-x-0 pt-4">
				{pantryItems}
			</div>
		</div>
	);
};

export default PantryList;
