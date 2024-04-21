import React from "react";
import PantryItem from "./PantryItem";

const PantryList = ({
	filter,
	searchFilter,
	sort,
	pantryItems,
	setPantryItems,
	setShoppingList,
	shoppingList,
	toggleShoppingList,
}) => {
	const filteredPantryItems = sort.filter(
		(item) =>
			filter.includes(item.status) &&
			searchFilter.some((searchItem) => searchItem.id === item.id)
	);

	const pantryItemList = filteredPantryItems.map((item) => {
		const addItemToShoppingList = (id) => {
			const index = pantryItems.findIndex((item) => item.id === id);
			if (shoppingList && !shoppingList.some((item) => item.id === id)) {
				const updatedItem = { ...pantryItems[index], onList: true };
				setPantryItems((prevItems) => {
					const updatedItems = [...prevItems];
					updatedItems[index] = updatedItem;
					return updatedItems;
				});
				setShoppingList((shoppingList) => [...shoppingList, updatedItem]);
			} else {
				const updatedItem = { ...pantryItems[index], onList: false };
				setPantryItems((prevItems) => {
					const updatedItems = [...prevItems];
					updatedItems[index] = updatedItem;
					return updatedItems;
				});
				setShoppingList(shoppingList.filter((item) => item.id !== id));
			}
		};

		const checkOffItem = (isChecked, id) => {
			const index = pantryItems.findIndex((item) => item.id === id);
			if (isChecked) {
				const updatedItem = {
					...pantryItems[index],
					onList: false,
					status: "in stock",
				};
				setPantryItems((prevItems) => {
					const updatedItems = [...prevItems];
					updatedItems[index] = updatedItem;
					return updatedItems;
				});
				setShoppingList(shoppingList.filter((item) => item.id !== id));
			}
		};

		return (
			<>
				{toggleShoppingList ? (
					item.onList && (
						<PantryItem
							id={item.id}
							icon={item.icon}
							name={item.name}
							aisle={item.aisle}
							status={item.status}
							shoppingList={shoppingList}
							onClick={() => addItemToShoppingList(item.id)}
							checkbox={true}
							toggleShoppingList={toggleShoppingList}
							onChange={(e) => checkOffItem(e.target.checked, item.id)}
						/>
					)
				) : (
					<PantryItem
						id={item.id}
						icon={item.icon}
						name={item.name}
						aisle={item.aisle}
						status={item.status}
						shoppingList={shoppingList}
						onClick={() => addItemToShoppingList(item.id)}
					/>
				)}
			</>
		);
	});

	const clearList = () => {
		setPantryItems((prevItems) =>
			prevItems.map((item) => ({ ...item, onList: false }))
		);
		setShoppingList([]);
	};

	return (
		<div>
			{pantryItemList}
			{toggleShoppingList && (
				<div className=" flex justify-center pt-4">
					{/* Note: add a pop up that asks if you want to mark all items as in stock */}
					<button
						class="bg-gray-900 text-white font-semibold p-2"
						onClick={() => clearList()}
					>
						Remove all items
					</button>
				</div>
			)}
		</div>
	);
};

export default PantryList;
