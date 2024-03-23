import React from "react";
import IconButton from "./buttons/IconButton";
import Tag from "./Tag";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const PantryItem = ({ icon, name, aisle, status }) => {
	return (
		<div className="flex justify-between grow hover:bg-gray-100 active:bg-gray-500">
			<div className="flex gap-4 items-center pl-4">
				<i className={icon}></i>
				<div className="flex flex-col">
					<span>{name}</span>
					<span className="text-xs">{aisle}</span>
				</div>
			</div>
			<div className="flex gap-2 items-center">
				<Tag label={status} />
				{/* This icon-button styling below is weird */}
				<div className="icon-button">
					<IconButton icon={faPlus} />
				</div>
			</div>
		</div>
	);
};

export default PantryItem;
