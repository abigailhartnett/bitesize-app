import React from "react";
import { AISLES } from "../constants";

import { SectionHeading, ListView } from "bitesize-app/components";

const PantryItemRelatedRecipes = ({ item }) => {
	// todo: this is repeat code
	const aisleIcons = AISLES.reduce((acc, aisle) => {
		acc[aisle.name] = aisle.icon;
		return acc;
	}, {});

	return (
		<div className="pb-4">
			<div className="flex items-center gap-2 pb-2">
				<i class={`${aisleIcons[item.aisle]} text-xl`}></i>
				<h2 className="capitalize font-bold text-lg ">{item.name}</h2>
			</div>
			<div>
				<span className="font-semibold">Store: </span>
				<span className="capitalize">{item.store}</span>
			</div>
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
