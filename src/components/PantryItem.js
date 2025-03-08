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
		<div
			className={`grid grid-cols-[auto_1fr_auto] items-center bg-white py-2 px-1 hover:bg-rose/10 hover:cursor-pointer text-pepper/95 first:rounded-tl-xl first:rounded-tr-xl last:rounded-br-xl last:rounded-bl-xl`}
		>
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
							className={`${item.onList && "text-raspberry"} `}
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
				className={`${currentPage !== "/create-recipe" && "cursor-pointer"} h-full flex items-center`}
				onClick={() => !ingredient && openPopover(item?.id)}
			>
				{/* ITEM NAME */}
				<div
					className={`flex flex-col ${item?.checked && item?.onList ? "line-through text-pepper/50" : ""}`}
				>
					<span className="capitalize font-medium ml-2">{item?.name}</span>

					{
						<span className="text-xs">
							{amount} {unit}
						</span>
					}
				</div>
			</div>
			{status && (
				<StatusButton item={item} showShoppingList={showShoppingList} />
			)}
		</div>
	);
};

export default PantryItem;
