import React from "react";
import ListPage from "../components/pages/list-page/ListPage";
import PantryItemList from "../components/calculations/PantryItemList";

const ShoppingListPage = ({
	filter,
	setFilter,
	pantryItems,
	setSort,
	filteredPantryItems,
	showShoppingList,
	setPantryItems,
	openPopover,
}) => {
	return (
		<ListPage
			filter={filter}
			setFilter={setFilter}
			pantryItems={pantryItems}
			setSort={setSort}
		>
			<PantryItemList
				filteredPantryItems={filteredPantryItems}
				pantryItems={pantryItems}
				setPantryItems={setPantryItems}
				filter={filter}
				showShoppingList={showShoppingList}
				openPopover={openPopover}
			/>
		</ListPage>
	);
};

export default ShoppingListPage;
