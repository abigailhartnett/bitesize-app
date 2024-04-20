import React from "react";
import PantryItem from "./PantryItem";

const PantryList = ({
	pantryOptions,
	filter,
	pantryItems,
	setPantryItems,
	setShoppingList,
	shoppingList,
}) => {
	const pantryItemList = pantryItems.map((item) => {
		const addItemToShoppingList = (id) => {
			if (shoppingList && !shoppingList.some((item) => item.id === id)) {
				const index = pantryItems.findIndex((item) => item.id === id);
				const updatedItem = { ...pantryItems[index], onList: true };
				setPantryItems((prevItems) => {
					const updatedItems = [...prevItems];
					updatedItems[index] = updatedItem;
					return updatedItems;
				});
				setShoppingList((shoppingList) => [...shoppingList, updatedItem]);
			} else {
				setShoppingList(shoppingList.filter((item) => item.id !== id));
			}
		};

		return (
			<>
				{filter.includes(item.status) && (
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

	return <div>{pantryItemList}</div>;
};

export default PantryList;
