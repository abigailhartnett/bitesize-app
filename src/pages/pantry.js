import React, { useState } from "react";
import PantryItem from "../components/PantryItem";
import Nav from "../components/Nav";
import Filter from "../components/Filter";
import Footer from "../components/Footer";
import Sort from "../components/Sort";

const PantryPage = () => {
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

	return (
		<div>
			<Nav />
			<Sort sortType="Pantry" onSort={sortItems} />
			<Filter />
			<div className="mt-4">
				<PantryItem />
			</div>
			<Footer />
		</div>
	);
};

export default PantryPage;
