import React from "react";
import supabase from "../../config/supabaseClient";
import { usePantry } from "../../contexts/PantryContext";
import { useListFunctions } from "bitesize-app/hooks";
import { SectionHeading, PantryItem } from "bitesize-app/components";
import { AISLES } from "../../constants";

const PantryItemList = ({
	filteredPantryItems,
	showShoppingList,
	openPopover,
	addToRecipe,
	currentPage,
	status,
	toggleButton,
	checkbox,
	ingredient,
}) => {
	const { pantryItems, setPantryItems } = usePantry();
	const { toggleOnList } = useListFunctions(pantryItems, setPantryItems);

	const aisleNames = AISLES.map((aisle) => aisle.name);
	const aisleIcons = AISLES.reduce((acc, aisle) => {
		acc[aisle.name] = aisle.icon;
		return acc;
	}, {});

	// Group items by aisle
	const groupedByAisle = filteredPantryItems.reduce((acc, item) => {
		// If the aisle doesn't exist in the accumulator, add it
		if (!acc[item.aisle]) {
			acc[item.aisle] = [];
		}
		// Add the item to the correct aisle
		acc[item.aisle].push(item);
		return acc;
	}, {});

	const sortedAisles = Object.entries(groupedByAisle).sort((a, b) => {
		const indexA =
			aisleNames.indexOf(a[0]) !== -1
				? aisleNames.indexOf(a[0])
				: AISLES.length;
		const indexB =
			aisleNames.indexOf(b[0]) !== -1
				? aisleNames.indexOf(b[0])
				: AISLES.length;
		return indexA - indexB;
	});

	return (
		<div>
			{sortedAisles.map(([aisle, items]) => (
				<div key={aisle}>
					<SectionHeading icon={aisleIcons[aisle]}>{aisle}</SectionHeading>
					{items?.map((item) => (
						<PantryItem
							key={item.id}
							item={item}
							toggleOnList={() => toggleOnList(item.name)}
							addToRecipe={() => addToRecipe(item.id)}
							checkbox={checkbox}
							showShoppingList={showShoppingList}
							openPopover={() => openPopover(item.id)}
							onChange={(e) => checkOffItem(e.target.checked, item.id)}
							currentPage={currentPage}
							pantryItems={pantryItems}
							setPantryItems={setPantryItems}
							aisle={aisle}
							status={status}
							toggleButton={toggleButton}
							ingredient={ingredient}
						/>
					))}
				</div>
			))}
		</div>
	);

	async function checkOffItem(isChecked, id) {
		// Find Item
		const item = pantryItems.find((item) => item.id === id);

		// Toggle the onList and status properties
		const updatedItem = {
			...item,
			checked: isChecked,
			status: isChecked ? "in stock" : item.prevStatus,
		};

		// Update the item in the state
		setPantryItems((prevItems) =>
			prevItems.map((item) => (item.id === id ? updatedItem : item))
		);

		// Update the item in Supabase
		const { error } = await supabase
			.from("pantry")
			.update({ status: updatedItem.status, checked: updatedItem.checked })
			.eq("id", id);

		if (error) {
			console.log(error);
		}
	}
};

export default PantryItemList;
