import React from "react";
// import IconButton from "./buttons/IconButton";
import Tag from "./Tag";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";

const PantryItem = ({
	icon,
	name,
	aisle,
	status,
	onClick,
	// pantryItems,
	// setPantryItems,
	// setShoppingList,
	shoppingList,
	id,
	checkbox,
}) => {
	return (
		<div className="flex py-1">
			<div className="flex justify-between grow hover:bg-gray-100 px-4">
				<div className="flex gap-4 items-center">
					{checkbox && <input type="checkbox" />}
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
					<button onClick={onClick} className="text-sm font-semibold">
						{shoppingList && shoppingList.some((item) => item.id === id)
							? "remove item"
							: "Add item"}
					</button>
				</div>
			</div>

			<div>{/* <IconButton icon={faPlus} onClick={onClick} /> */}</div>
		</div>
	);
};

export default PantryItem;
