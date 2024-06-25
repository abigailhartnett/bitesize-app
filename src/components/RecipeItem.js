import React from "react";
import { Link } from "react-router-dom";

const RecipeItem = ({ item }) => {
	return (
		<Link
			to={`/recipes/${item.slug}`}
			className="relative flex items-center gap-2 border border-solid rounded-2xl border-pepper/20 w-full h-full p-4 aspect-square bg-white content-start"
		>
			<div>
				<div>
					{item.status === "planned" ? (
						<i className="fas fa-check text-broccoli text-xs pr-2"></i>
					) : (
						""
					)}
					<span
						className={`text-xs capitalize font-semibold ${item.status === "not planned" ? "text-pepper/40" : "text-broccoli"}`}
					>
						{item.status}
					</span>
				</div>
				<span className="font-semibold capitalize">{item.title}</span>
			</div>
		</Link>
	);
};

export default RecipeItem;
