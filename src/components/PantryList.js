import React, { useState } from "react";
import { pantry } from "../data/pantry";
import Sort from "./Sort";
import Filter from "./Filter";
import PantryItem from "./PantryItem";

const PantryList = () => {
	const [sortedItems, setSortedItems] = useState([]);
	const sortItems = (sortType) => {
		const sorted = [...sortedItems].sort((a, b) => {
			if (a[sortType] < b[sortType]) {
				return -1;
			} else if (a[sortType] > b[sortType]) {
				return 1;
			}
		});
		setSortedItems(sorted);
	};

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
			<Sort sortType="Pantry" onSort={sortItems} />
			<Filter />
			<div className="border-solid border-black border-2 border-b-0 border-x-0 pt-4">
				{pantryItems}
			</div>
		</div>
	);
};

export default PantryList;
