import React from "react";

const PantryItem = ({
	item,
	name,
	aisle,
	status,
	onChange,
	toggleShoppingList,
	toggleStatus,
	toggleOnList,
	openPopover,
	onList,
	checkbox,
	currentPage,
	addToRecipe,
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
			className={`flex py-1 ${onList && !toggleShoppingList ? "text-pepper/50" : ""} ${toggleShoppingList && item.checked ? "line-through text-pepper/50" : ""}`}
		>
			<div className="flex justify-between grow hover:bg-gray-100 px-4">
				<div className={`flex gap-4 items-center`}>
					{/* STATUS BUTTON */}
					<button onClick={() => toggleStatus(item.id)}>
						<span
							class={`material-symbols-outlined ${toggleShoppingList && item.checked ? `${statusColor}-50` : statusColor}`}
						>
							{icon}
						</span>
					</button>
					{/* ITEM NAME */}
					<div className="flex flex-col">
						<span>{name}</span>
						<span className="text-xs">{aisle}</span>
					</div>
				</div>
				{/* NOTE: Change this so that the popover opens on the whole thing except the add item button (wrap name) */}
				<div
					className="flex grow cursor-pointer"
					onClick={() => openPopover(item.id)}
				></div>
				{toggleShoppingList ? (
					checkbox && (
						<input
							type="checkbox"
							onChange={onChange}
							checked={item.checked && true}
						/>
					)
				) : (
					<>
						{currentPage === "/create-recipe" ? (
							<button onClick={addToRecipe}>Add to recipe</button>
						) : (
							<button
								onClick={toggleOnList}
								className="text-sm font-semibold pl-4"
							>
								{onList ? (
									<span class={`material-symbols-outlined`}>shopping_cart</span>
								) : (
									<span class={`material-symbols-outlined text-pepper`}>
										add
									</span>
								)}
							</button>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default PantryItem;
