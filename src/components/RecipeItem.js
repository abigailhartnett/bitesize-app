import React from "react";
// import supabase from "../config/supabaseClient";
import IconButton from "./buttons/IconButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
// import ReadinessCalculation from "./calculations/readinessCalculation";

const RecipeItem = ({ item, slug }) => {
	// const [recipeIngredients, setRecipeIngredients] = useState(null);
	// const [fetchError, setFetchError] = useState(null);

	// const fetchRecipes = async () => {
	// 	const { data, error } = await supabase.from("recipeIngredients").select();

	// 	if (error) {
	// 		setFetchError("Could not fetch recipe ingredients");
	// 		setRecipeIngredients(null);
	// 		console.log(fetchError, error);
	// 	}
	// 	if (data) {
	// 		setRecipeIngredients(data);
	// 		setFetchError(null);
	// 	}
	// };
	return (
		<div className="flex py-1 justify-between">
			<Link to={slug} className="flex-grow">
				<div className="hover:bg-gray-100 active:bg-gray-500 px-4">
					<div className="gap-4 items-center">
						<div className="flex flex-col">
							<h2>{item.title}</h2>
							<span className="text-xs">
								{/* <ReadinessCalculation id={id} /> */}
								{item.status}
							</span>
						</div>
					</div>
				</div>
			</Link>
			<div>
				<IconButton icon={faPlus} />
			</div>
		</div>
	);
};

export default RecipeItem;
