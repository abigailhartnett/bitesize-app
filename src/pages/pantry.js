import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PantryList from "../components/PantryList";
import Filter from "../components/Filter";
import Sort from "../components/Sort";

const PantryPage = () => {
	return (
		<div>
			<Nav pageTitle="Pantry" />
			<Sort sortType="Pantry" />
			<Filter filterBy="pantry" />
			<PantryList />
			<Footer searchPlaceholder="Search for pantry item" />
		</div>
	);
};

export default PantryPage;
