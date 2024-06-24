import React from "react";
import PantryItemRelatedRecipes from "./PantryItemRelatedRecipes";

const PantryItemCard = ({ item, children }) => {
	return (
		<div className="flex flex-col gap-4">
			<PantryItemRelatedRecipes item={item} />
			{children}
		</div>
	);
};

export default PantryItemCard;
