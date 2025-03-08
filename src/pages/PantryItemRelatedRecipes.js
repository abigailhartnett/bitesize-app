import React from "react";

import { SectionHeading, ListView } from "bitesize-app/components";

const PantryItemRelatedRecipes = ({ item }) => {
	return (
		<div>
			<h2 className="capitalize font-bold text-lg p-4">{item.name}</h2>
			{/* todo: uncomment this section once the Recipes feature is fully functional */}
			{/* <SectionHeading
				icon={"fa-regular fa-hat-chef"}
				color={"text-pepper/30"}
				// todo: do NOT use importance—holy cow, that's horrible. Find another way to fix this color override.
				className="!bg-white !static !top-auto"
			>
				Related recipes
			</SectionHeading>
			<ListView></ListView>  */}
		</div>
	);
};

export default PantryItemRelatedRecipes;
