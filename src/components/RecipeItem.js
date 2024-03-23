import React from "react";
import IconButton from "./buttons/IconButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const RecipeItem = ({ name, readiness, link }) => {
	return (
		<Link to={link}>
			<div className="flex justify-between grow hover:bg-gray-100 active:bg-gray-500">
				<div className="flex items-center pl-4">
					<div className="flex flex-col">
						<h2>{name}</h2>
						<span className="text-xs">{readiness}</span>
					</div>
				</div>
				{/* This icon-button styling below is weird */}
				<div className="icon-button">
					<IconButton icon={faPlus} />
				</div>
			</div>
		</Link>
	);
};

export default RecipeItem;
