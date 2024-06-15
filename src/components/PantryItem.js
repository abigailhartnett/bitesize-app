import React from "react";
import StatusButton from "./buttons/StatusButton";
import IconButton from "./buttons/IconButton";
import Checkbox from "./inputs/Checkbox";

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
	aisle,
	status,
	toggleButton,
	amount,
	unit,
}) => {
	const recipeIcon = "fa-circle-plus";
	const shoppingIcon = item.onList ? "fa-circle-minus" : "fa-circle-plus";

	return (
		<div
			className={`grid grid-cols-[auto_1fr_auto] items-center gap-2 py-1 ${showShoppingList && item.checked ? "line-through text-pepper/50" : ""}`}
		>
			<div>
				{toggleButton && (
					<IconButton
						onClick={toggleOnList}
						icon={shoppingIcon}
						className={`${item.onList && "text-pepper/50"}`}
					/>
				)}
				{checkbox && (
					<Checkbox
						onChange={onChange}
						checked={item.checked && true}
						label="Check off item"
					/>
				)}
			</div>

			<div
				className={`hover:font-medium cursor-pointer`}
				onClick={() => openPopover(item.id)}
			>
				{currentPage === "/create-recipe" ? (
					<IconButton
						onClick={addToRecipe}
						icon={recipeIcon}
						className={item.onList && "text-pepper/50"}
					/>
				) : (
					""
				)}

				{/* ITEM NAME */}
				<div className="flex items-center gap-2">
					<span>{item.name}</span>
					{aisle && <span className="text-xs">{item.aisle}</span>}
					{
						<span className="text-xs">
							{amount} {unit}
						</span>
					}
				</div>
			</div>
			{status && (
				<StatusButton
					pantryItems={pantryItems}
					setPantryItems={setPantryItems}
					item={item}
					showShoppingList={showShoppingList}
				/>
			)}
		</div>
	);
};

export default PantryItem;
