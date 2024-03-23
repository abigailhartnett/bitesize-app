import React from "react";
import TextButton from "./buttons/TextButton";

const RecipeItem = ({ name, readiness }) => {
	return (
		<div className="flex justify-between items-center">
			<div>
				<h2>{name}</h2>
				<span>{readiness}</span>
			</div>
			<TextButton text="View recipe" />
		</div>
	);
};

export default RecipeItem;
