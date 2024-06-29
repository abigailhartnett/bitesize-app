import React from "react";
import PantryItem from "../PantryItem";
import supabase from "../../config/supabaseClient";
import { useToggleOnList } from "../../hooks/useToggleOnList";
import SectionHeading from "../SectionHeading";

const PantryItemList = ({
	pantryItems,
	setPantryItems,
	filteredPantryItems,
	showShoppingList,
	openPopover,
	addToRecipe,
	currentPage,
	aisle,
	status,
	toggleButton,
	checkbox,
	ingredient,
}) => {
	const toggle = useToggleOnList(pantryItems, setPantryItems);

	const aisleOrder = [
		"produce",
		"bakery",
		"meat",
		"seafood",
		"deli",
		"dairy",
		"condiments",
		"canned goods",
		"ethnic",
		"baking",
		"dried goods",
		"cereal",
		"snacks",
		"spices",
		"desserts",
		"frozen",
		"drinks",
		"sauces",
		"tea",
		"water",
		"alcohol",
		"paper goods",
		"health",
		"hygiene",
		"pharmacy",
		"other",
	];

	const aisleIcons = {
		produce: {
			icon: "fa-solid fa-salad",
			color: "text-broccoli",
		},
		bakery: { icon: "fa-solid fa-bread-slice", color: "text-pepper/40" },
		meat: { icon: "fa-solid fa-drumstick", color: "text-tomato" },
		seafood: { icon: "fa-solid fa-fish", color: "text-mustard" },
		deli: { icon: "fa-solid fa-cheese", color: "text-mustard" },
		dairy: { icon: "fa-solid fa-cheese" },
		condiments: { icon: "fa-solid fa-pepper" },
		"canned goods": { icon: "fa-solid fa-can" },
		ethnic: { icon: "fa-solid fa-globe" },
		baking: { icon: "fa-solid fa-cookie" },
		"dried goods": { icon: "fa-solid fa-shopping-bag" },
		cereal: { icon: "fa-solid fa-bowl" },
		snacks: { icon: "fa-solid fa-cookie" },
		spices: { icon: "fa-solid fa-pepper" },
		desserts: { icon: "fa-solid fa-cookie" },
		frozen: { icon: "fa-solid fa-snowflake" },
		drinks: { icon: "fa-solid fa-glass" },
		sauces: { icon: "fa-solid fa-pepper" },
		tea: { icon: "fa-solid fa-mug" },
		water: { icon: "fa-solid fa-tint" },
		alcohol: { icon: "fa-solid fa-wine-bottle" },
		"paper goods": { icon: "fa-solid fa-toilet-paper" },
		health: { icon: "fa-solid fa-heart" },
		hygiene: { icon: "fa-solid fa-soap" },
		pharmacy: { icon: "fa-solid fa-prescription-bottle" },
		other: { icon: "fa-solid fa-question" },
	};

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
			aisleOrder.indexOf(a[0]) !== -1
				? aisleOrder.indexOf(a[0])
				: aisleOrder.length;
		const indexB =
			aisleOrder.indexOf(b[0]) !== -1
				? aisleOrder.indexOf(b[0])
				: aisleOrder.length;
		return indexA - indexB;
	});

	return (
		<div>
			{sortedAisles.map(([aisle, items]) => (
				<div key={aisle}>
					<SectionHeading icon={aisleIcons[aisle].icon}>{aisle}</SectionHeading>
					{items?.map((item) => (
						<PantryItem
							key={item.id}
							item={item}
							toggleOnList={() => toggle(item.name)}
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
