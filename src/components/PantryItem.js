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
}) => {
	const shoppingIcon = item.onList ? "fa-circle-check" : "fa-circle-plus";
	const recipeIcon = "fa-circle-plus";

	return (
		<div
			className={`flex py-1 ${item.onList && !showShoppingList ? "text-pepper/50" : ""} ${showShoppingList && item.checked ? "line-through text-pepper/50" : ""}`}
		>
			<div
				className="flex justify-between hover:font-medium cursor-pointer grow px-4"
				onClick={() => openPopover(item.id)}
			>
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
			</div>
			{currentPage === "/shopping-list" ? (
				checkbox && (
					<Checkbox
						onChange={onChange}
						checked={item.checked && true}
						label="Check off item"
					/>
				)
			) : currentPage === "/create-recipe" ? (
				<IconButton
					onClick={addToRecipe}
					icon={recipeIcon}
					className={item.onList && !showShoppingList ? "text-pepper/50" : ""}
				/>
			) : (
				<IconButton onClick={toggleOnList} icon={shoppingIcon} />
			)}
		</div>
	);
};

export default PantryItem;
