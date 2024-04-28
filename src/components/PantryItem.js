import React from "react";
import Tag from "./Tag";

const PantryItem = ({
	name,
	aisle,
	status,
	onClick,
	onChange,
	toggleShoppingList,
	onList,
	checkbox,
}) => {
	const icon =
		status === "out"
			? "radio_button_unchecked"
			: status === "low"
				? "radio_button_partial"
				: "radio_button_checked";

	const statusColor =
		status === "out"
			? "text-tomato"
			: status === "low"
				? "text-mustard"
				: "text-broccoli";

	return (
		<div
			className={`flex py-1 ${onList && !toggleShoppingList ? "text-pepper/50" : ""}`}
		>
			<div className="flex justify-between grow hover:bg-gray-100 px-4">
				<div className={`flex gap-4 items-center`}>
					<span class={`material-symbols-outlined ${statusColor}`}>{icon}</span>
					<div className="flex flex-col">
						<span>{name}</span>
						<span className="text-xs">{aisle}</span>
					</div>
				</div>

				{toggleShoppingList ? (
					checkbox && <input type="checkbox" onChange={onChange} />
				) : (
					<button onClick={onClick} className="text-sm font-semibold">
						{onList ? (
							<span class={`material-symbols-outlined`}>shopping_cart</span>
						) : (
							<span class={`material-symbols-outlined text-pepper`}>add</span>
						)}
					</button>
				)}
			</div>
		</div>
	);
};

export default PantryItem;
