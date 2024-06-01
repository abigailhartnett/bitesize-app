import React from "react";
import StatusButton from "./buttons/StatusButton";

const PantryItem = ({
	item,
	onChange,
	showShoppingList,
	toggleOnList,
	openPopover,
	checkbox,
	currentPage,
	addToRecipe,
	pantryItems,
	setPantryItems,
}) => {
	return (
		<div
			className={`flex py-1 ${item.onList && !showShoppingList ? "text-pepper/50" : ""} ${showShoppingList && item.checked ? "line-through text-pepper/50" : ""}`}
		>
			<div className="flex justify-between grow hover:bg-gray-100 px-4">
				<div className={`flex gap-4 items-center`}>
					<StatusButton
						pantryItems={pantryItems}
						setPantryItems={setPantryItems}
						item={item}
						showShoppingList={showShoppingList}
					/>
					{/* ITEM NAME */}
					<div className="flex flex-col">
						<span>{item.name}</span>
						<span className="text-xs">{item.aisle}</span>
					</div>
				</div>
				{/* NOTE: Change this so that the popover opens on the whole thing except the add item button (wrap name) */}
				<div
					className="flex grow cursor-pointer"
					onClick={() => openPopover(item.id)}
				></div>
				{showShoppingList ? (
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
								{item.onList ? (
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
