import React, { useState } from "react";
import supabase from "../config/supabaseClient";
import { useParams } from "react-router-dom";
import IconButton from "./buttons/IconButton";
import { Link } from "react-router-dom";

const RecipeItem = ({ item, recipes }) => {
	const { slug } = useParams();

	const [currentRecipe, setCurrentRecipe] = useState(
		recipes?.find((recipe) => recipe.slug === slug)
	);

	const icon =
		currentRecipe && currentRecipe?.status === "planned"
			? "fa-circle-minus"
			: "fa-circle-plus";

	const togglePlanned = async () => {
		const newStatus =
			currentRecipe?.status === "planned" ? "not planned" : "planned";
		setCurrentRecipe((prevItem) => ({ ...prevItem, status: newStatus }));

		try {
			await supabase
				.from("recipes")
				.update({ status: newStatus })
				.eq("slug", slug);
		} catch (error) {
			console.error("Error adding recipe to meal plan:", error);
			setCurrentRecipe((prevItem) => ({
				...prevItem,
				status: currentRecipe?.status,
			}));
		}
	};

	return (
		<div className={`flex items-center gap-2`}>
			<Link to={`/recipes/${item.slug}`} className="flex-grow">
				<div className="flex flex-col">
					<span className="font-semibold capitalize">{item.title}</span>
					<span className="text-xs">{item.status}</span>
				</div>
			</Link>
			<IconButton
				onClick={() => togglePlanned()}
				icon={icon}
				faStyle="fa-solid"
				size="xl"
			/>
		</div>
	);
};

export default RecipeItem;
