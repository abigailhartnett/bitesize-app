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
	recipeIngredient,
}) => {
	const recipeIcon = "fa-circle-plus";
	const shoppingIcon = item.onList ? "fa-circle-minus" : "fa-circle-plus";

	return (
		<div className={`grid grid-cols-[auto_1fr_auto] items-center`}>
			<div>
				{recipeIngredient ? (
					<IconButton
						onClick={addToRecipe}
						icon={recipeIcon}
						faStyle="fa-solid"
						size="lg"
					/>
				) : (
					""
				)}
				{toggleButton && (
					<IconButton
						onClick={toggleOnList}
						icon={shoppingIcon}
						className={`${item.onList && "text-pepper/50"}`}
						faStyle="fa-solid"
						size="xl"
					/>
				)}
				{checkbox && (
					<Checkbox
						onChange={onChange}
						checked={item.checked && true}
						ariaLabel="Check off item"
					/>
				)}
			</div>

			<div
				className={`hover:font-medium ${currentPage !== "/create-recipe" && "cursor-pointer"}`}
				onClick={() => !recipeIngredient && openPopover(item.id)}
			>
				{/* ITEM NAME */}
				<div
					className={`flex items-center gap-2 ${item.checked && item.onList ? "line-through text-pepper/50" : ""}`}
				>
					<span className="capitalize">{item.name}</span>
					{aisle && <span className="text-xs capitalize">{item.aisle}</span>}
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
