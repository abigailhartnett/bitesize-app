import React, { useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PantryList from "../components/PantryList";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import { pantry } from "../data/pantry";

const PantryPage = () => {
	const [pantryOptions, setPantryOptions] = useState([]);

	return (
		<div className="fixed inset-x-0 top-0 flex flex-col justify-between min-h-screen">
			<div class="border-solid border-black border-2 border-t-0 border-x-0 bg-white py-2">
				<div class="flex justify-between pb-2 mr-3">
					<Nav pageTitle="Pantry" />
					<Sort sortType="Pantry" />
				</div>
				{/* Note: remove filterBy */}
				<Filter
					filterBy="pantry"
					pantryOptions={pantryOptions}
					setPantryOptions={setPantryOptions}
					pantry={pantry}
				/>
			</div>
			<div className="h-screen overflow-y-auto overflow-x-visible flex-grow pb-56">
				<PantryList
					pantryOptions={pantryOptions}
					setPantryOptions={setPantryOptions}
				/>
			</div>
			<div className="fixed inset-x-0 bottom-0">
				<Footer searchPlaceholder="Search for pantry item" />
			</div>
		</div>
	);
};

export default PantryPage;
