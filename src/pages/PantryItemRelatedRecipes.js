import React from "react";
import SectionHeading from "../components/SectionHeading";
import ListView from "../components/ListView";

const PantryItemRelatedRecipes = ({ item }) => {
	return (
		<div>
			<h2 className="capitalize font-bold text-lg p-4">{item.name}</h2>
			<SectionHeading icon={"hat-chef"}>Related recipes</SectionHeading>
			<ListView></ListView>
		</div>
	);
};

export default PantryItemRelatedRecipes;
