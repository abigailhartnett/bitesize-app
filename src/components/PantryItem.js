import React from "react";
import Tag from "./Tag";

const PantryItem = ({
	icon,
	name,
	aisle,
	status,
	onClick,
	onChange,
	toggleShoppingList,
	onList,
	checkbox,
}) => {
	return (
		<div
			className={`flex py-1 ${onList && !toggleShoppingList ? "text-pepper/50" : ""}`}
		>
			<div className="flex justify-between grow hover:bg-gray-100 px-4">
				<div className={`flex gap-4 items-center`}>
					<i className={icon}></i>
					<div className="flex flex-col">
						<span>{name}</span>
						<span className="text-xs">{aisle}</span>
					</div>
				</div>
				<div className="flex gap-2">
					<div className="flex gap-2 items-center">
						<Tag label={status} />
					</div>
					{toggleShoppingList ? (
						checkbox && <input type="checkbox" onChange={onChange} />
					) : (
						<button onClick={onClick} className="text-sm font-semibold">
							{onList ? "Remove item" : "Add item"}
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default PantryItem;
