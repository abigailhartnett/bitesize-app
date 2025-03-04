import React from "react";

import { SectionHeading, ListView } from "bitesize-app/components";

const PantryItemRelatedRecipes = ({ item }) => {
	return (
		<div>
			<h2 className="capitalize font-bold text-lg p-4">{item.name}</h2>
			<SectionHeading icon={"fa-regular fa-hat-chef"} color={"text-pepper/30"}>
				Related recipes
			</SectionHeading>
			<ListView></ListView>
		</div>
	);
};

export default PantryItemRelatedRecipes;
