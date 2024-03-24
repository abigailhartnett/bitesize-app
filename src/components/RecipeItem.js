import React from "react";
import IconButton from "./buttons/IconButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const RecipeItem = ({ name, readiness, link }) => {
	return (
		<div className="flex py-1 justify-between">
			<Link to={link} className="flex-grow">
				<div className="hover:bg-gray-100 active:bg-gray-500 px-4">
					<div className="gap-4 items-center">
						<div className="flex flex-col">
							<h2>{name}</h2>
							<span className="text-xs">{readiness}</span>
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
