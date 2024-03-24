import React from "react";
import Nav from "../components/Nav";
import Filter from "../components/Filter";
import ShoppingList from "../components/ShoppingList";
import Footer from "../components/Footer";
import Sort from "../components/Sort";
import PantryList from "../components/PantryList";

const ShoppingListPage = () => {
	return (
		<div className="fixed inset-x-0 top-0 flex flex-col justify-between min-h-screen">
			<div class="border-solid border-black border-2 border-t-0 border-x-0 bg-white py-2">
				<div class="flex justify-between pb-2 mr-3">
					<Nav pageTitle="Shopping List" />
					<Sort sortType="Pantry" />
				</div>
				<Filter filterBy="store" />
			</div>
			<div className="h-screen overflow-y-auto overflow-x-visible flex-grow pb-56">
				<ShoppingList />
			</div>
			<div className="fixed inset-x-0 bottom-0">
				<Footer searchPlaceholder="Add item to list" />
			</div>
		</div>
	);
};

export default ShoppingListPage;
