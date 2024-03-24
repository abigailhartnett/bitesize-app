import React from "react";
import Nav from "../components/Nav";
import Sort from "../components/Sort";
import Filter from "../components/Filter";
import ShoppingList from "../components/ShoppingList";
import Footer from "../components/Footer";
import Button from "../components/buttons/Button";

const ShoppingListPage = () => {
	return (
		<div>
			<Nav pageTitle="Shopping List" />
			<Filter filterBy="store" />
			<ShoppingList />
			<div className="pt-8">
				<Button text="Add items to list" />
			</div>
			{/* <Footer searchPlaceholder="Search shopping list" /> */}
		</div>
	);
};

export default ShoppingListPage;
