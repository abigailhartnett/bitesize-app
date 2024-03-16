import React from "react";
import { pantry } from "../data/pantry";
import IconButton from "./buttons/IconButton";
import Tag from "./Tag";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const PantryItem = () => {
	const pantryItems = pantry.map((item) => {
		return (
			<div>
				<div className="flex justify-between grow hover:bg-gray-100 active:bg-gray-500">
					<div className="flex gap-4 items-center pl-4">
						{/* Note: update to component */}
						<i className={item.icon}></i>
						<div className="flex flex-col">
							<span className="">{item.name}</span>
							<span className="text-xs">{item.aisle}</span>
						</div>
					</div>
					<div className="flex gap-2 items-center">
						<Tag label={item.status} />
						<div className="icon-button">
							<IconButton icon={faPlus} />
						</div>
					</div>
				</div>
			</div>
		);
	});

	return <div>{pantryItems}</div>;
};

export default PantryItem;
