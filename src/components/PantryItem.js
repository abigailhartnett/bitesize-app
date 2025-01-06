import React from "react";

import { StatusButton, IconButton, Checkbox } from "bitesize-app/components";

const PantryItem = ({
	item,
	ingredientItem,
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
	ingredient,
}) => {
	const recipeIcon = "fa-circle-plus";
	const shoppingIcon = item?.onList ? "fa-circle-minus" : "fa-circle-plus";

	return (
		<div className={`grid grid-cols-[auto_1fr_auto] items-center`}>
			<div>
				{toggleButton && ingredient ? (
					<IconButton
						onClick={addToRecipe}
						icon={recipeIcon}
						faStyle="fa-solid"
						size="lg"
					/>
				) : (
					toggleButton && (
						<IconButton
							onClick={toggleOnList}
							icon={shoppingIcon}
							className={`${item.onList && "text-pepper/50"}`}
							faStyle="fa-solid"
							size="xl"
						/>
					)
				)}
				{checkbox && ingredient ? (
					<Checkbox
						onChange={onChange}
						checked={ingredientItem?.ingredient_checked && true}
						ariaLabel="Check off item"
					/>
				) : (
					checkbox && (
						<Checkbox
							onChange={onChange}
							checked={item?.checked && true}
							ariaLabel="Check off item"
						/>
					)
				)}
			</div>

			<div
				className={`hover:font-medium ${currentPage !== "/create-recipe" && "cursor-pointer"}`}
				onClick={() => !ingredient && openPopover(item?.id)}
			>
				{/* ITEM NAME */}
				<div
					className={`flex items-center gap-2 ${item?.checked && item?.onList ? "line-through text-pepper/50" : ""}`}
				>
					<span className="capitalize">{item?.name}</span>
					{aisle && <span className="text-xs capitalize">{item?.aisle}</span>}
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
